import { NextRequest, NextResponse } from "next/server";
import { aiAskRequestSchema } from "@/lib/validations";
import { generateAIResponse, getFallbackResponse } from "@/lib/ai";
import { seedProducts } from "@/lib/seed-data";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/types/database";

/**
 * POST /api/ai/ask
 * Product Q&A via AI (grounded to product data)
 * 
 * AI Grounding Strategy:
 * 1. Fetches the specific product's structured fields + FAQs
 * 2. Sends to Google Gemini with a prompt instructing it to only use product data
 * 3. Returns a grounded answer with optional cited fields
 * 4. If question is outside available data, responds with failsafe
 */
export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate request body
    const validation = aiAskRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Invalid request", 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { productId, message, history } = validation.data;

    // Fetch product data
    let product: ProductRow | null = null;

    // Check if Supabase is configured
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (!error && data) {
          product = data;
        }
      } catch (dbError) {
        console.warn("Database query failed:", dbError);
      }
    }

    // Fallback to seed data if no product found
    if (!product) {
      const seedProduct = seedProducts.find((p) => p.id === productId);
      if (seedProduct) {
        product = {
          ...seedProduct,
          id: seedProduct.id!,
          tenure_min_months: seedProduct.tenure_min_months ?? 6,
          tenure_max_months: seedProduct.tenure_max_months ?? 60,
          processing_fee_pct: seedProduct.processing_fee_pct ?? 0,
          prepayment_allowed: seedProduct.prepayment_allowed ?? true,
          disbursal_speed: seedProduct.disbursal_speed ?? "standard",
          docs_level: seedProduct.docs_level ?? "standard",
          faq: seedProduct.faq ?? [],
          terms: seedProduct.terms ?? {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as ProductRow;
      }
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Generate AI response using Gemini (with fallback)
    const { response, source } = await generateAIResponse(
      product, 
      message, 
      history || []
    );

    return NextResponse.json({
      response,
      source, // "gemini" or "fallback"
      citedFields: ["rate_apr", "min_income", "min_credit_score", "tenure", "faq", "terms"],
    });
  } catch (error) {
    console.error("Error in AI ask endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
