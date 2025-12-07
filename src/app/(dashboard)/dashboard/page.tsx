"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ProductRow } from "@/types/database";
import { calculateMatchScore } from "@/lib/badges";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductWithScore extends ProductRow {
  matchScore: number;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<ProductWithScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Demo user profile for match scoring
  const userIncome = 50000;
  const userCreditScore = 720;

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      
      // Calculate match scores and sort
      const productsWithScores: ProductWithScore[] = data.products
        .map((product: ProductRow) => ({
          ...product,
          matchScore: calculateMatchScore(product, userIncome, userCreditScore),
        }))
        .sort((a: ProductWithScore, b: ProductWithScore) => b.matchScore - a.matchScore);

      setProducts(productsWithScores);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const top5Products = products.slice(0, 5);
  const bestMatch = top5Products[0];
  const otherMatches = top5Products.slice(1);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Your Top Picks</h1>
        </div>
        <p className="text-muted-foreground">
          Personalized loan recommendations based on your profile
        </p>
      </div>

      {/* User Profile Summary */}
      <div className="flex flex-wrap gap-4 p-4 bg-card/50 backdrop-blur-sm border rounded-xl">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Your Income:</span>
          <span className="font-medium">₹{userIncome.toLocaleString("en-IN")}/mo</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Credit Score:</span>
          <span className="font-medium">{userCreditScore}</span>
        </div>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchProducts}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

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
        <div className="space-y-8">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[300px] rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* Products Display */}
      {!isLoading && !error && products.length > 0 && (
        <div className="space-y-8">
          {/* Best Match - Featured */}
          {bestMatch && (
            <div className="animate-fade-in-up">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Best Match for You
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductCard
                  product={bestMatch}
                  isBestMatch={true}
                  matchScore={bestMatch.matchScore}
                />
                {/* Quick Stats Panel */}
                <div className="hidden lg:flex flex-col justify-center p-6 bg-card/50 backdrop-blur-sm border rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold">Why This Match?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Income</span>
                      <span className="font-medium">₹{userIncome.toLocaleString("en-IN")}/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Required Income</span>
                      <span className="font-medium text-primary">₹{bestMatch.min_income.toLocaleString("en-IN")}/mo</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Credit Score</span>
                      <span className="font-medium">{userCreditScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Required Score</span>
                      <span className="font-medium text-primary">{bestMatch.min_credit_score}+</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium text-primary">{bestMatch.rate_apr}% APR</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">
                    This loan matches your profile with the lowest APR and flexible terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Other Top Matches */}
          {otherMatches.length > 0 && (
            <div className="animate-fade-in-up stagger-2">
              <h2 className="text-lg font-semibold mb-4">Other Top Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherMatches.map((product, index) => (
                  <div
                    key={product.id}
                    className={`animate-fade-in-up stagger-${index + 1}`}
                  >
                    <ProductCard
                      product={product}
                      matchScore={product.matchScore}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card/50 backdrop-blur-sm border rounded-xl animate-fade-in-up stagger-5">
            <StatItem
              label="Products Analyzed"
              value={products.length.toString()}
            />
            <StatItem
              label="Best APR"
              value={`${Math.min(...products.map((p) => p.rate_apr))}%`}
            />
            <StatItem
              label="Your Best Match"
              value={`${bestMatch?.matchScore ?? 0}%`}
            />
            <StatItem
              label="Banks Available"
              value={new Set(products.map((p) => p.bank)).size.toString()}
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn&apos;t find any loan products at the moment.
          </p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      )}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

