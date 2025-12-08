import { z } from "zod";

// Loan types enum
export const loanTypeSchema = z.enum([
  "personal",
  "education",
  "vehicle",
  "home",
  "credit_line",
  "debt_consolidation",
]);

export const disbursalSpeedSchema = z.enum([
  "instant",
  "fast",
  "standard",
  "slow",
]);

export const docsLevelSchema = z.enum(["minimal", "standard", "extensive"]);

export const chatRoleSchema = z.enum(["user", "assistant"]);

// FAQ schema
export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// Terms schema
export const termsSchema = z.object({
  prepayment_penalty: z.string().optional(),
  late_payment_fee: z.string().optional(),
  processing_time: z.string().optional(),
  eligibility_criteria: z.array(z.string()).optional(),
  required_documents: z.array(z.string()).optional(),
});

// Product schema
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Product name is required"),
  bank: z.string().min(1, "Bank name is required"),
  type: loanTypeSchema,
  rate_apr: z.number().min(0).max(100),
  min_income: z.number().min(0),
  min_credit_score: z.number().min(300).max(900),
  tenure_min_months: z.number().min(1).default(6),
  tenure_max_months: z.number().min(1).default(60),
  processing_fee_pct: z.number().min(0).max(10).default(0),
  prepayment_allowed: z.boolean().default(true),
  disbursal_speed: disbursalSpeedSchema.default("standard"),
  docs_level: docsLevelSchema.default("standard"),
  summary: z.string().min(1, "Summary is required"),
  faq: z.array(faqSchema).default([]),
  terms: termsSchema.default({}),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// User schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("Invalid email address"),
  display_name: z.string().nullable().optional(),
  income: z.number().min(0).nullable().optional(),
  credit_score: z.number().min(300).max(900).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Chat message schema
export const chatMessageSchema = z.object({
  role: chatRoleSchema,
  content: z.string().min(1, "Message cannot be empty"),
});

// AI Ask request schema
export const aiAskRequestSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
  history: z.array(chatMessageSchema).default([]),
});

// AI Ask response schema
export const aiAskResponseSchema = z.object({
  response: z.string(),
  citedFields: z.array(z.string()).optional(),
});

// Product filters schema
export const productFiltersSchema = z.object({
  bank: z.string().optional(),
  type: loanTypeSchema.optional(),
  minApr: z.number().min(0).optional(),
  maxApr: z.number().max(100).optional(),
  minIncome: z.number().min(0).optional(),
  maxIncome: z.number().optional(),
  minCreditScore: z.number().min(300).optional(),
  maxCreditScore: z.number().max(900).optional(),
});

// User profile update schema
export const userProfileUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  income: z.number().min(0).optional(),
  credit_score: z.number().min(300).max(900).optional(),
});

// Type exports
export type LoanType = z.infer<typeof loanTypeSchema>;
export type DisbursalSpeed = z.infer<typeof disbursalSpeedSchema>;
export type DocsLevel = z.infer<typeof docsLevelSchema>;
export type ChatRole = z.infer<typeof chatRoleSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type Terms = z.infer<typeof termsSchema>;
export type Product = z.infer<typeof productSchema>;
export type User = z.infer<typeof userSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type AIAskRequest = z.infer<typeof aiAskRequestSchema>;
export type AIAskResponse = z.infer<typeof aiAskResponseSchema>;
export type ProductFilters = z.infer<typeof productFiltersSchema>;
export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;


