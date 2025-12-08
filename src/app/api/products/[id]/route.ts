import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { seedProducts } from "@/lib/seed-data";
import { z } from "zod";
import type { ProductRow } from "@/types/database";

const paramsSchema = z.object({
  id: z.string().uuid("Invalid product ID"),
});

/**
 * GET /api/products/[id]
 * Fetch a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    
    // Validate ID
    const validation = paramsSchema.safeParse(resolvedParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const { id } = validation.data;

    let product: ProductRow | null = null;

    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      product = data;
    } catch (dbError) {
      // Fallback to seed data
      console.warn("Database not available, using seed data:", dbError);
      
      const seedProduct = seedProducts.find((p) => p.id === id);
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

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}


