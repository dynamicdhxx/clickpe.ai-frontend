import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { productFiltersSchema } from "@/lib/validations";
import { seedProducts } from "@/lib/seed-data";
import type { ProductRow } from "@/types/database";

/**
 * Helper to get seed products as ProductRow[]
 */
function getSeedProducts(): ProductRow[] {
  return seedProducts.map((p) => ({
    ...p,
    id: p.id!,
    tenure_min_months: p.tenure_min_months ?? 6,
    tenure_max_months: p.tenure_max_months ?? 60,
    processing_fee_pct: p.processing_fee_pct ?? 0,
    prepayment_allowed: p.prepayment_allowed ?? true,
    disbursal_speed: p.disbursal_speed ?? "standard",
    docs_level: p.docs_level ?? "standard",
    faq: p.faq ?? [],
    terms: p.terms ?? {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) as ProductRow[];
}

/**
 * GET /api/products
 * Fetch all products with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters from query params
    const filtersInput = {
      bank: searchParams.get("bank") || undefined,
      type: searchParams.get("type") || undefined,
      minApr: searchParams.get("minApr") 
        ? parseFloat(searchParams.get("minApr")!) 
        : undefined,
      maxApr: searchParams.get("maxApr") 
        ? parseFloat(searchParams.get("maxApr")!) 
        : undefined,
      minIncome: searchParams.get("minIncome") 
        ? parseFloat(searchParams.get("minIncome")!) 
        : undefined,
      maxIncome: searchParams.get("maxIncome") 
        ? parseFloat(searchParams.get("maxIncome")!) 
        : undefined,
      minCreditScore: searchParams.get("minCreditScore") 
        ? parseInt(searchParams.get("minCreditScore")!) 
        : undefined,
      maxCreditScore: searchParams.get("maxCreditScore") 
        ? parseInt(searchParams.get("maxCreditScore")!) 
        : undefined,
    };

    // Validate filters
    const filtersResult = productFiltersSchema.safeParse(filtersInput);
    if (!filtersResult.success) {
      return NextResponse.json(
        { error: "Invalid filter parameters", details: filtersResult.error.errors },
        { status: 400 }
      );
    }

    const filters = filtersResult.data;

    let products: ProductRow[] = [];
    
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      // Try to fetch from Supabase
      try {
        const supabase = await createClient();
        let query = supabase.from("products").select("*");

        // Apply filters
        if (filters.bank) {
          query = query.ilike("bank", `%${filters.bank}%`);
        }
        if (filters.type) {
          query = query.eq("type", filters.type);
        }
        if (filters.minApr !== undefined) {
          query = query.gte("rate_apr", filters.minApr);
        }
        if (filters.maxApr !== undefined) {
          query = query.lte("rate_apr", filters.maxApr);
        }
        if (filters.minIncome !== undefined) {
          query = query.lte("min_income", filters.minIncome);
        }
        if (filters.minCreditScore !== undefined) {
          query = query.lte("min_credit_score", filters.minCreditScore);
        }

        const { data, error } = await query.order("rate_apr", { ascending: true });

        if (error) {
          throw error;
        }

        products = data || [];
      } catch (dbError) {
        console.warn("Database error, using seed data:", dbError);
        products = getSeedProducts();
      }
    } else {
      // Use seed data directly
      products = getSeedProducts();
    }

    // Apply filters to seed data (if using seed data)
    if (!supabaseUrl || !supabaseKey || products === getSeedProducts()) {
      if (filters.bank) {
        products = products.filter((p) =>
          p.bank.toLowerCase().includes(filters.bank!.toLowerCase())
        );
      }
      if (filters.type) {
        products = products.filter((p) => p.type === filters.type);
      }
      if (filters.minApr !== undefined) {
        products = products.filter((p) => p.rate_apr >= filters.minApr!);
      }
      if (filters.maxApr !== undefined) {
        products = products.filter((p) => p.rate_apr <= filters.maxApr!);
      }
      if (filters.minIncome !== undefined) {
        products = products.filter((p) => p.min_income <= filters.minIncome!);
      }
      if (filters.minCreditScore !== undefined) {
        products = products.filter(
          (p) => p.min_credit_score <= filters.minCreditScore!
        );
      }

      // Sort by APR
      products.sort((a, b) => a.rate_apr - b.rate_apr);
    }

    // Get unique banks for filter options
    const banks = [...new Set(products.map((p) => p.bank))].sort();

    return NextResponse.json({
      products,
      banks,
      total: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

