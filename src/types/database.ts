// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      users: {
        Row: UserRow;
        Insert: UserInsert;
        Update: UserUpdate;
      };
      ai_chat_messages: {
        Row: AIChatMessageRow;
        Insert: AIChatMessageInsert;
        Update: AIChatMessageUpdate;
      };
    };
  };
}

export type LoanType =
  | "personal"
  | "education"
  | "vehicle"
  | "home"
  | "credit_line"
  | "debt_consolidation";

export type DisbursalSpeed = "instant" | "fast" | "standard" | "slow";
export type DocsLevel = "minimal" | "standard" | "extensive";
export type ChatRole = "user" | "assistant";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Terms {
  prepayment_penalty?: string;
  late_payment_fee?: string;
  processing_time?: string;
  eligibility_criteria?: string[];
  required_documents?: string[];
}

export interface ProductRow {
  id: string;
  name: string;
  bank: string;
  type: LoanType;
  rate_apr: number;
  min_income: number;
  min_credit_score: number;
  tenure_min_months: number;
  tenure_max_months: number;
  processing_fee_pct: number;
  prepayment_allowed: boolean;
  disbursal_speed: DisbursalSpeed;
  docs_level: DocsLevel;
  summary: string;
  faq: FAQ[];
  terms: Terms;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  id?: string;
  name: string;
  bank: string;
  type: LoanType;
  rate_apr: number;
  min_income: number;
  min_credit_score: number;
  tenure_min_months?: number;
  tenure_max_months?: number;
  processing_fee_pct?: number;
  prepayment_allowed?: boolean;
  disbursal_speed?: DisbursalSpeed;
  docs_level?: DocsLevel;
  summary: string;
  faq?: FAQ[];
  terms?: Terms;
}

export interface ProductUpdate {
  name?: string;
  bank?: string;
  type?: LoanType;
  rate_apr?: number;
  min_income?: number;
  min_credit_score?: number;
  tenure_min_months?: number;
  tenure_max_months?: number;
  processing_fee_pct?: number;
  prepayment_allowed?: boolean;
  disbursal_speed?: DisbursalSpeed;
  docs_level?: DocsLevel;
  summary?: string;
  faq?: FAQ[];
  terms?: Terms;
}

export interface UserRow {
  id: string;
  email: string;
  display_name: string | null;
  income: number | null;
  credit_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserInsert {
  id?: string;
  email: string;
  display_name?: string | null;
  income?: number | null;
  credit_score?: number | null;
}

export interface UserUpdate {
  email?: string;
  display_name?: string | null;
  income?: number | null;
  credit_score?: number | null;
}

export interface AIChatMessageRow {
  id: string;
  user_id: string;
  product_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}

export interface AIChatMessageInsert {
  id?: string;
  user_id: string;
  product_id: string;
  role: ChatRole;
  content: string;
}

export interface AIChatMessageUpdate {
  content?: string;
}

// Extended types for frontend use
export interface Product extends ProductRow {
  badges: ProductBadge[];
  matchScore?: number;
}

export interface ProductBadge {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  icon?: string;
}

export interface User extends UserRow {}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}


