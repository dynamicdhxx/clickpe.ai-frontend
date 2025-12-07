"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChatSheet } from "@/components/chat-sheet";
import type { ProductRow, ProductBadge } from "@/types/database";
import { generateBadges, getBadgeColorClass } from "@/lib/badges";
import {
  Percent,
  IndianRupee,
  Calendar,
  Shield,
  Zap,
  FileText,
  MessageCircle,
  Star,
  TrendingDown,
  CheckCircle,
  Clock,
  FileMinus,
  Wallet,
  Award,
  Gift,
  GraduationCap,
  Home,
  Car,
} from "lucide-react";

interface ProductCardProps {
  product: ProductRow;
  isBestMatch?: boolean;
  matchScore?: number;
  variant?: "default" | "compact";
}

const iconMap: Record<string, React.ElementType> = {
  percent: Percent,
  "trending-down": TrendingDown,
  "check-circle": CheckCircle,
  zap: Zap,
  clock: Clock,
  "file-minus": FileMinus,
  wallet: Wallet,
  "indian-rupee": IndianRupee,
  "shield-check": Shield,
  award: Award,
  calendar: Calendar,
  gift: Gift,
  "graduation-cap": GraduationCap,
  home: Home,
  car: Car,
};

function BadgeIcon({ iconName }: { iconName?: string }) {
  if (!iconName) return null;
  const Icon = iconMap[iconName];
  if (!Icon) return null;
  return <Icon className="mr-1 h-3 w-3" />;
}

export function ProductCard({
  product,
  isBestMatch = false,
  matchScore,
  variant = "default",
}: ProductCardProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const badges = generateBadges(product);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLoanTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      personal: "Personal Loan",
      education: "Education Loan",
      vehicle: "Vehicle Loan",
      home: "Home Loan",
      credit_line: "Credit Line",
      debt_consolidation: "Debt Consolidation",
    };
    return labels[type] || type;
  };

  if (variant === "compact") {
    return (
      <>
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold leading-tight line-clamp-1">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {product.bank}
                </CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0 text-xs">
                {getLoanTypeLabel(product.type)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-0.5">
                <p className="text-muted-foreground text-xs">APR</p>
                <p className="font-semibold text-primary">{product.rate_apr}%</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-muted-foreground text-xs">Min Income</p>
                <p className="font-medium">{formatCurrency(product.min_income)}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {badges.slice(0, 3).map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs px-2 py-0.5 ${getBadgeColorClass(badge.variant)}`}
                >
                  <BadgeIcon iconName={badge.icon} />
                  {badge.label}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="mr-1.5 h-3 w-3" />
              Ask About Product
            </Button>
          </CardFooter>
        </Card>

        <ChatSheet
          product={product}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Card
        className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${
          isBestMatch
            ? "border-2 border-primary bg-gradient-to-br from-primary/5 via-background to-background"
            : "border-border/50 bg-card/50 backdrop-blur-sm"
        }`}
      >
        {isBestMatch && (
          <div className="absolute top-0 right-0">
            <div className="relative">
              <div className="absolute -top-1 -right-1 h-24 w-24 overflow-hidden">
                <div className="absolute top-3 -right-8 w-32 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 py-1 text-center text-xs font-semibold text-white shadow-lg">
                  <Star className="inline h-3 w-3 mr-1" />
                  Best Match
                </div>
              </div>
            </div>
          </div>
        )}

        {matchScore !== undefined && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">
                {matchScore}% Match
              </span>
            </div>
          </div>
        )}

        <CardHeader className={`${isBestMatch ? "pt-8" : "pt-6"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold leading-tight">
                {product.name}
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                {product.bank}
              </CardDescription>
            </div>
            <Badge
              variant={isBestMatch ? "default" : "outline"}
              className="shrink-0"
            >
              {getLoanTypeLabel(product.type)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.summary}
          </p>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Percent className="h-4 w-4" />
                <span className="text-xs">Interest Rate</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {product.rate_apr}%
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  APR
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <IndianRupee className="h-4 w-4" />
                <span className="text-xs">Min Income</span>
              </div>
              <p className="text-lg font-semibold">
                {formatCurrency(product.min_income)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Credit Score</span>
              </div>
              <p className="text-lg font-semibold">{product.min_credit_score}+</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Tenure</span>
              </div>
              <p className="text-lg font-semibold">
                {product.tenure_min_months}-{product.tenure_max_months}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  mo
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${getBadgeColorClass(badge.variant)}`}
              >
                <BadgeIcon iconName={badge.icon} />
                {badge.label}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            {product.disbursal_speed === "instant" && (
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-500" />
                <span>Instant Disbursal</span>
              </div>
            )}
            {product.docs_level === "minimal" && (
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-blue-500" />
                <span>Minimal Docs</span>
              </div>
            )}
            {product.prepayment_allowed && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Prepayment OK</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button
            className="w-full group/btn"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
            Ask About Product
          </Button>
        </CardFooter>
      </Card>

      <ChatSheet
        product={product}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}

