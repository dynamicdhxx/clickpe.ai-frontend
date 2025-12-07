"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductRow } from "@/types/database";
import type { ProductFilters as Filters } from "@/lib/validations";
import {
  List,
  LayoutGrid,
  AlertCircle,
  Package,
  RefreshCw,
} from "lucide-react";

type ViewMode = "grid" | "list";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [banks, setBanks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<Filters>({});

  const fetchProducts = useCallback(async (appliedFilters: Filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query string from filters
      const params = new URLSearchParams();
      if (appliedFilters.bank) params.set("bank", appliedFilters.bank);
      if (appliedFilters.type) params.set("type", appliedFilters.type);
      if (appliedFilters.minApr !== undefined)
        params.set("minApr", appliedFilters.minApr.toString());
      if (appliedFilters.maxApr !== undefined)
        params.set("maxApr", appliedFilters.maxApr.toString());
      if (appliedFilters.minIncome !== undefined)
        params.set("minIncome", appliedFilters.minIncome.toString());
      if (appliedFilters.minCreditScore !== undefined)
        params.set("minCreditScore", appliedFilters.minCreditScore.toString());

      const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products);
      setBanks(data.banks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-7 w-7 text-primary" />
            All Loan Products
          </h1>
          <p className="text-muted-foreground">
            Browse and filter through all available loan products
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchProducts(filters)}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as ViewMode)}
          >
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="px-3">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        banks={banks}
        initialFilters={filters}
      />

      {/* Results Count */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{products.length}</span>{" "}
            products
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className={viewMode === "grid" ? "h-[350px] rounded-xl" : "h-32 rounded-xl"}
            />
          ))}
        </div>
      )}

      {/* Products Grid/List */}
      {!isLoading && !error && products.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard
                product={product}
                variant={viewMode === "list" ? "compact" : "default"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters to see more results.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({});
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

