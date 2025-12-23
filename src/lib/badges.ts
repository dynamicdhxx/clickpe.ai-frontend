import type { ProductRow, ProductBadge } from "@/types/database";

/**
 * Badge Generation Logic
 * 
 * This module generates dynamic badges for loan products based on their attributes.
 * Each badge highlights a specific feature or benefit of the loan product.
 * 
 * Badge Categories:
 * - APR-related: Low APR, Competitive Rate
 * - Prepayment: No Prepayment Penalty
 * - Speed: Fast Disbursal, Instant Approval
 * - Documentation: Low Docs, Minimal Paperwork
 * - Eligibility: Income requirements, Credit Score requirements
 * - Tenure: Flexible Tenure
 * - Special: Limited-Time Offer, Best for <category>
 */

export function generateBadges(product: ProductRow): ProductBadge[] {
  const badges: ProductBadge[] = [];

  // APR-based badges
  if (product.rate_apr <= 8) {
    badges.push({
      label: "Low APR",
      variant: "default",
      icon: "percent",
    });
  } else if (product.rate_apr <= 12) {
    badges.push({
      label: "Competitive Rate",
      variant: "secondary",
      icon: "trending-down",
    });
  }

  // Prepayment badge
  if (product.prepayment_allowed) {
    badges.push({
      label: "No Prepayment Penalty",
      variant: "secondary",
      icon: "check-circle",
    });
  }

  // Disbursal speed badges
  if (product.disbursal_speed === "instant") {
    badges.push({
      label: "Instant Disbursal",
      variant: "default",
      icon: "zap",
    });
  } else if (product.disbursal_speed === "fast") {
    badges.push({
      label: "Fast Disbursal",
      variant: "secondary",
      icon: "clock",
    });
  }

  // Documentation level badges
  if (product.docs_level === "minimal") {
    badges.push({
      label: "Minimal Docs",
      variant: "secondary",
      icon: "file-minus",
    });
  }

  // Income requirement badges
  if (product.min_income <= 25000) {
    badges.push({
      label: `₹${formatIncome(product.min_income)}+ Eligible`,
      variant: "outline",
      icon: "wallet",
    });
  } else if (product.min_income <= 50000) {
    badges.push({
      label: `Salary ≥ ₹${formatIncome(product.min_income)}`,
      variant: "outline",
      icon: "indian-rupee",
    });
  }

  // Credit score badges
  if (product.min_credit_score <= 650) {
    badges.push({
      label: "Low Credit Score OK",
      variant: "secondary",
      icon: "shield-check",
    });
  } else if (product.min_credit_score >= 750) {
    badges.push({
      label: `Credit Score ≥ ${product.min_credit_score}`,
      variant: "outline",
      icon: "award",
    });
  }

  // Tenure flexibility badge
  const tenureDiff = product.tenure_max_months - product.tenure_min_months;
  if (tenureDiff >= 48) {
    badges.push({
      label: "Flexible Tenure",
      variant: "secondary",
      icon: "calendar",
    });
  }

  // Processing fee badge
  if (product.processing_fee_pct === 0) {
    badges.push({
      label: "Zero Processing Fee",
      variant: "default",
      icon: "gift",
    });
  } else if (product.processing_fee_pct <= 0.5) {
    badges.push({
      label: "Low Processing Fee",
      variant: "secondary",
      icon: "percent",
    });
  }

  // Loan type specific badges
  switch (product.type) {
    case "education":
      badges.push({
        label: "Education Loan",
        variant: "outline",
        icon: "graduation-cap",
      });
      break;
    case "home":
      badges.push({
        label: "Home Loan",
        variant: "outline",
        icon: "home",
      });
      break;
    case "vehicle":
      badges.push({
        label: "Vehicle Loan",
        variant: "outline",
        icon: "car",
      });
      break;
  }

  // Return top badges (limit to avoid clutter)
  return badges.slice(0, 5);
}

/**
 * Calculate match score for a product based on user preferences
 */
export function calculateMatchScore(
  product: ProductRow,
  userIncome?: number | null,
  userCreditScore?: number | null
): number {
  let score = 50; // Base score

  // APR scoring (lower is better)
  if (product.rate_apr <= 8) score += 20;
  else if (product.rate_apr <= 12) score += 15;
  else if (product.rate_apr <= 15) score += 10;
  else if (product.rate_apr <= 18) score += 5;

  // User eligibility bonus
  if (userIncome && userIncome >= product.min_income) {
    score += 15;
    // Extra bonus for comfortable margin
    if (userIncome >= product.min_income * 1.5) score += 5;
  }

  if (userCreditScore && userCreditScore >= product.min_credit_score) {
    score += 15;
    // Extra bonus for good credit score margin
    if (userCreditScore >= product.min_credit_score + 50) score += 5;
  }

  // Feature bonuses
  if (product.prepayment_allowed) score += 5;
  if (product.disbursal_speed === "instant") score += 8;
  else if (product.disbursal_speed === "fast") score += 5;
  if (product.docs_level === "minimal") score += 5;
  if (product.processing_fee_pct === 0) score += 5;

  // Tenure flexibility bonus
  const tenureDiff = product.tenure_max_months - product.tenure_min_months;
  if (tenureDiff >= 48) score += 3;

  return Math.min(100, score);
}

/**
 * Format income for display
 */
function formatIncome(income: number): string {
  if (income >= 100000) {
    return `${(income / 100000).toFixed(1)}L`;
  }
  if (income >= 1000) {
    return `${(income / 1000).toFixed(0)}K`;
  }
  return income.toString();
}

/**
 * Get badge color classes based on variant
 */
export function getBadgeColorClass(variant: ProductBadge["variant"]): string {
  switch (variant) {
    case "default":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "secondary":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "destructive":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "outline":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default:
      return "";
  }
}





