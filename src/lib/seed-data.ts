import type { ProductInsert } from "@/types/database";

/**
 * Seed data for loan products
 * Contains 15 diverse loan products from various banks
 */
export const seedProducts: ProductInsert[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "HDFC Personal Loan Express",
    bank: "HDFC Bank",
    type: "personal",
    rate_apr: 10.5,
    min_income: 25000,
    min_credit_score: 700,
    tenure_min_months: 12,
    tenure_max_months: 60,
    processing_fee_pct: 1.5,
    prepayment_allowed: true,
    disbursal_speed: "fast",
    docs_level: "minimal",
    summary:
      "Quick personal loan with minimal documentation. Perfect for salaried professionals looking for instant funds with flexible repayment options.",
    faq: [
      {
        question: "What is the maximum loan amount?",
        answer: "You can get up to ₹40 lakhs based on your income and credit profile.",
      },
      {
        question: "How long does approval take?",
        answer: "Approval is typically within 4 hours for existing HDFC customers.",
      },
      {
        question: "Can I prepay the loan?",
        answer: "Yes, prepayment is allowed after 6 months with no penalty.",
      },
    ],
    terms: {
      prepayment_penalty: "None after 6 months",
      late_payment_fee: "2% of EMI amount",
      processing_time: "4-24 hours",
      eligibility_criteria: [
        "Age 21-60 years",
        "Minimum 2 years work experience",
        "Stable employment",
      ],
      required_documents: ["PAN Card", "Aadhaar Card", "Latest 3 months salary slips"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "SBI Education Loan",
    bank: "State Bank of India",
    type: "education",
    rate_apr: 7.5,
    min_income: 0,
    min_credit_score: 650,
    tenure_min_months: 36,
    tenure_max_months: 180,
    processing_fee_pct: 0,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "standard",
    summary:
      "Comprehensive education loan for studies in India and abroad. Covers tuition, living expenses, and travel costs with interest subsidy for economically weaker sections.",
    faq: [
      {
        question: "What expenses are covered?",
        answer:
          "Tuition fees, hostel charges, examination fees, library fees, travel expenses, and purchase of books/equipment.",
      },
      {
        question: "Is collateral required?",
        answer: "No collateral for loans up to ₹7.5 lakhs. Above that, collateral is required.",
      },
      {
        question: "When does repayment start?",
        answer: "Repayment starts 1 year after course completion or 6 months after getting a job.",
      },
    ],
    terms: {
      prepayment_penalty: "None",
      late_payment_fee: "1.5% per annum on overdue amount",
      processing_time: "7-14 days",
      eligibility_criteria: [
        "Indian national",
        "Secured admission in recognized institution",
        "Co-applicant (parent/guardian) required",
      ],
      required_documents: [
        "Admission letter",
        "Fee structure",
        "Mark sheets",
        "Income proof of co-applicant",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "ICICI Home Loan",
    bank: "ICICI Bank",
    type: "home",
    rate_apr: 8.4,
    min_income: 40000,
    min_credit_score: 750,
    tenure_min_months: 60,
    tenure_max_months: 360,
    processing_fee_pct: 0.5,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "extensive",
    summary:
      "Affordable home loan with competitive interest rates. Special offers for women borrowers with additional 0.05% concession.",
    faq: [
      {
        question: "What is the maximum loan-to-value ratio?",
        answer: "Up to 90% for loans up to ₹30 lakhs, 80% for loans between ₹30-75 lakhs.",
      },
      {
        question: "Are there any special offers?",
        answer: "Women borrowers get 0.05% interest rate concession. Festive offers may apply.",
      },
      {
        question: "Can I transfer my existing home loan?",
        answer: "Yes, balance transfer facility is available with attractive rates.",
      },
    ],
    terms: {
      prepayment_penalty: "None for floating rate loans",
      late_payment_fee: "2% per month on overdue EMI",
      processing_time: "5-7 working days",
      eligibility_criteria: [
        "Age 23-65 years",
        "Minimum 3 years total work experience",
        "Property should be legally clear",
      ],
      required_documents: [
        "Income proof",
        "Property documents",
        "Identity proof",
        "Bank statements",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Axis Bank Car Loan",
    bank: "Axis Bank",
    type: "vehicle",
    rate_apr: 9.25,
    min_income: 20000,
    min_credit_score: 700,
    tenure_min_months: 12,
    tenure_max_months: 84,
    processing_fee_pct: 1.0,
    prepayment_allowed: true,
    disbursal_speed: "fast",
    docs_level: "minimal",
    summary:
      "Finance your dream car with Axis Bank. Quick approval process with up to 100% on-road funding for select models.",
    faq: [
      {
        question: "What types of vehicles are covered?",
        answer: "New cars, used cars (up to 5 years old), and two-wheelers.",
      },
      {
        question: "What is the down payment requirement?",
        answer: "Minimum 10% down payment for new cars. Used cars require 15-20%.",
      },
      {
        question: "Is insurance mandatory?",
        answer: "Yes, comprehensive insurance is mandatory for the loan tenure.",
      },
    ],
    terms: {
      prepayment_penalty: "2% of outstanding principal if prepaid within 12 months",
      late_payment_fee: "₹500 per EMI bounce",
      processing_time: "2-4 hours",
      eligibility_criteria: [
        "Age 21-65 years",
        "Salaried or self-employed",
        "Valid driving license",
      ],
      required_documents: ["KYC documents", "Income proof", "Quotation from dealer"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Bajaj Finserv Instant Loan",
    bank: "Bajaj Finserv",
    type: "personal",
    rate_apr: 12.0,
    min_income: 22000,
    min_credit_score: 685,
    tenure_min_months: 12,
    tenure_max_months: 60,
    processing_fee_pct: 2.0,
    prepayment_allowed: true,
    disbursal_speed: "instant",
    docs_level: "minimal",
    summary:
      "Get instant cash in your account within minutes. Fully digital process with no paperwork required for pre-approved customers.",
    faq: [
      {
        question: "How fast is the disbursal?",
        answer: "Funds are credited within 2 minutes for pre-approved customers.",
      },
      {
        question: "What is the maximum loan amount?",
        answer: "Up to ₹25 lakhs based on your credit profile and relationship with Bajaj.",
      },
      {
        question: "Is there any hidden charges?",
        answer: "No hidden charges. All fees are disclosed upfront in the loan agreement.",
      },
    ],
    terms: {
      prepayment_penalty: "4% of principal outstanding",
      late_payment_fee: "₹800 per EMI bounce + GST",
      processing_time: "2-5 minutes",
      eligibility_criteria: [
        "Existing Bajaj Finserv customer or pre-approved offer",
        "Age 23-55 years",
        "Salaried professional",
      ],
      required_documents: ["OTP verification only for pre-approved customers"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Kotak Mahindra Home Loan",
    bank: "Kotak Mahindra Bank",
    type: "home",
    rate_apr: 8.65,
    min_income: 35000,
    min_credit_score: 720,
    tenure_min_months: 60,
    tenure_max_months: 240,
    processing_fee_pct: 0.5,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "extensive",
    summary:
      "Realize your dream of owning a home with Kotak's flexible home loan. Get doorstep service and dedicated relationship manager.",
    faq: [
      {
        question: "What is the maximum loan amount?",
        answer: "Up to ₹5 crores based on property value and repayment capacity.",
      },
      {
        question: "Can NRIs apply?",
        answer: "Yes, NRIs can apply with additional documentation requirements.",
      },
      {
        question: "Is top-up loan available?",
        answer: "Yes, existing home loan customers can avail top-up loans at attractive rates.",
      },
    ],
    terms: {
      prepayment_penalty: "None for individual borrowers with floating rate",
      late_payment_fee: "18% p.a. on overdue amount",
      processing_time: "7-10 working days",
      eligibility_criteria: [
        "Age 21-65 years",
        "Minimum income ₹35,000/month",
        "Clear CIBIL record",
      ],
      required_documents: [
        "Salary slips",
        "Form 16",
        "Property documents",
        "Bank statements",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Tata Capital Personal Loan",
    bank: "Tata Capital",
    type: "personal",
    rate_apr: 11.25,
    min_income: 25000,
    min_credit_score: 700,
    tenure_min_months: 12,
    tenure_max_months: 72,
    processing_fee_pct: 1.5,
    prepayment_allowed: true,
    disbursal_speed: "fast",
    docs_level: "minimal",
    summary:
      "Trustworthy personal loans from the house of Tata. Transparent pricing with no hidden charges and flexible EMI options.",
    faq: [
      {
        question: "What can I use this loan for?",
        answer:
          "Wedding expenses, medical emergencies, home renovation, travel, debt consolidation, etc.",
      },
      {
        question: "How do I check my eligibility?",
        answer: "Use our online eligibility calculator or call our toll-free number.",
      },
      {
        question: "Can I choose my EMI date?",
        answer: "Yes, you can select your preferred EMI date between 1st and 28th of the month.",
      },
    ],
    terms: {
      prepayment_penalty: "3% after 12 EMIs",
      late_payment_fee: "2% of EMI + GST",
      processing_time: "24-48 hours",
      eligibility_criteria: [
        "Age 23-58 years",
        "Minimum 1 year in current job",
        "Salaried or self-employed",
      ],
      required_documents: [
        "PAN Card",
        "Address proof",
        "3 months bank statement",
        "Salary slips",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Punjab National Bank Vehicle Loan",
    bank: "Punjab National Bank",
    type: "vehicle",
    rate_apr: 8.85,
    min_income: 18000,
    min_credit_score: 680,
    tenure_min_months: 12,
    tenure_max_months: 84,
    processing_fee_pct: 0.5,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "standard",
    summary:
      "Affordable vehicle financing from PNB. Special schemes for electric vehicles with additional interest concession.",
    faq: [
      {
        question: "Is there any discount for EV purchases?",
        answer: "Yes, 0.25% interest rate concession for electric vehicles.",
      },
      {
        question: "What is the funding limit?",
        answer: "Up to 85% of vehicle on-road price for new vehicles.",
      },
      {
        question: "Can I include accessories in the loan?",
        answer: "Yes, genuine accessories up to ₹50,000 can be included.",
      },
    ],
    terms: {
      prepayment_penalty: "1% of outstanding amount",
      late_payment_fee: "2% per month on overdue EMI",
      processing_time: "3-5 working days",
      eligibility_criteria: [
        "Age 18-65 years",
        "Regular income source",
        "Good repayment track record",
      ],
      required_documents: [
        "KYC documents",
        "Income proof",
        "Vehicle quotation",
        "Bank statement",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "IDFC First Bank Credit Line",
    bank: "IDFC First Bank",
    type: "credit_line",
    rate_apr: 14.5,
    min_income: 30000,
    min_credit_score: 720,
    tenure_min_months: 6,
    tenure_max_months: 36,
    processing_fee_pct: 0,
    prepayment_allowed: true,
    disbursal_speed: "instant",
    docs_level: "minimal",
    summary:
      "Flexible credit line that you can use as and when needed. Pay interest only on utilized amount with zero processing fee.",
    faq: [
      {
        question: "How is interest calculated?",
        answer: "Interest is charged only on the amount you withdraw, calculated daily.",
      },
      {
        question: "Can I repay and redraw?",
        answer: "Yes, it's a revolving credit line. You can repay and redraw multiple times.",
      },
      {
        question: "What is the credit limit?",
        answer: "Up to ₹10 lakhs based on your income and credit profile.",
      },
    ],
    terms: {
      prepayment_penalty: "None",
      late_payment_fee: "₹500 per instance",
      processing_time: "Instant approval",
      eligibility_criteria: [
        "Age 21-60 years",
        "Minimum salary ₹30,000",
        "Good credit history",
      ],
      required_documents: ["Digital KYC", "Bank statement access"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Bank of Baroda Education Loan",
    bank: "Bank of Baroda",
    type: "education",
    rate_apr: 7.75,
    min_income: 0,
    min_credit_score: 600,
    tenure_min_months: 60,
    tenure_max_months: 180,
    processing_fee_pct: 0,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "standard",
    summary:
      "Vidya Lakshmi scheme compliant education loan. Interest subsidy available for economically weaker sections under CSIS scheme.",
    faq: [
      {
        question: "What is the Vidya Lakshmi scheme?",
        answer:
          "It's a government portal where you can apply for education loans to multiple banks.",
      },
      {
        question: "Is interest subsidy available?",
        answer:
          "Yes, under Central Sector Interest Subsidy scheme for students from EWS families.",
      },
      {
        question: "What courses are eligible?",
        answer:
          "All courses in India recognized by competent authorities and select courses abroad.",
      },
    ],
    terms: {
      prepayment_penalty: "None",
      late_payment_fee: "2% p.a. penal interest",
      processing_time: "10-15 working days",
      eligibility_criteria: [
        "Indian citizen",
        "Admission secured in recognized course",
        "Satisfactory academic record",
      ],
      required_documents: [
        "Admission proof",
        "Fee structure",
        "Academic records",
        "Co-applicant documents",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Yes Bank Debt Consolidation Loan",
    bank: "Yes Bank",
    type: "debt_consolidation",
    rate_apr: 13.5,
    min_income: 40000,
    min_credit_score: 730,
    tenure_min_months: 12,
    tenure_max_months: 60,
    processing_fee_pct: 1.5,
    prepayment_allowed: true,
    disbursal_speed: "fast",
    docs_level: "standard",
    summary:
      "Consolidate multiple loans into one easy EMI. Simplify your finances and potentially save on interest costs.",
    faq: [
      {
        question: "What debts can be consolidated?",
        answer:
          "Credit card dues, personal loans, consumer durable loans, and other unsecured debts.",
      },
      {
        question: "Will this improve my credit score?",
        answer:
          "Timely repayments can help improve your credit score over time.",
      },
      {
        question: "How much can I consolidate?",
        answer: "Up to ₹50 lakhs depending on your repayment capacity.",
      },
    ],
    terms: {
      prepayment_penalty: "2% of outstanding after 6 months",
      late_payment_fee: "₹750 per instance",
      processing_time: "3-5 working days",
      eligibility_criteria: [
        "Existing debt obligations",
        "Good repayment history",
        "Minimum salary ₹40,000",
      ],
      required_documents: [
        "Existing loan statements",
        "Bank statements",
        "Salary slips",
        "KYC documents",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "IndusInd Bank Premium Personal Loan",
    bank: "IndusInd Bank",
    type: "personal",
    rate_apr: 10.0,
    min_income: 50000,
    min_credit_score: 750,
    tenure_min_months: 12,
    tenure_max_months: 60,
    processing_fee_pct: 1.0,
    prepayment_allowed: true,
    disbursal_speed: "instant",
    docs_level: "minimal",
    summary:
      "Premium personal loan for high-income professionals. Enjoy preferential rates and dedicated relationship management.",
    faq: [
      {
        question: "What makes this premium?",
        answer:
          "Lower interest rates, higher loan amounts, dedicated RM, and priority processing.",
      },
      {
        question: "What is the maximum loan amount?",
        answer: "Up to ₹75 lakhs for eligible customers.",
      },
      {
        question: "Is balance transfer available?",
        answer: "Yes, you can transfer existing loans at attractive rates.",
      },
    ],
    terms: {
      prepayment_penalty: "2% after 12 EMIs",
      late_payment_fee: "2% of EMI or ₹750 whichever is higher",
      processing_time: "Same day for pre-approved",
      eligibility_criteria: [
        "Age 25-58 years",
        "Minimum salary ₹50,000",
        "Credit score 750+",
      ],
      required_documents: ["Minimal - digital verification for pre-approved"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Federal Bank Two-Wheeler Loan",
    bank: "Federal Bank",
    type: "vehicle",
    rate_apr: 9.99,
    min_income: 15000,
    min_credit_score: 650,
    tenure_min_months: 12,
    tenure_max_months: 48,
    processing_fee_pct: 1.0,
    prepayment_allowed: true,
    disbursal_speed: "fast",
    docs_level: "minimal",
    summary:
      "Easy financing for your two-wheeler purchase. Quick approval with minimal documentation and doorstep service.",
    faq: [
      {
        question: "What two-wheelers are covered?",
        answer: "All new scooters and motorcycles from authorized dealers.",
      },
      {
        question: "What is the funding percentage?",
        answer: "Up to 90% of on-road price for salaried individuals.",
      },
      {
        question: "Is there any offer for students?",
        answer: "Yes, special scheme for students with parent as co-applicant.",
      },
    ],
    terms: {
      prepayment_penalty: "None after 6 months",
      late_payment_fee: "₹400 per bounce",
      processing_time: "Same day",
      eligibility_criteria: [
        "Age 18-60 years",
        "Regular income source",
        "Valid driving license",
      ],
      required_documents: ["KYC", "Income proof", "Dealer quotation"],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Canara Bank Home Loan",
    bank: "Canara Bank",
    type: "home",
    rate_apr: 8.35,
    min_income: 30000,
    min_credit_score: 700,
    tenure_min_months: 60,
    tenure_max_months: 360,
    processing_fee_pct: 0.5,
    prepayment_allowed: true,
    disbursal_speed: "standard",
    docs_level: "extensive",
    summary:
      "Affordable home loans from a trusted PSU bank. Special rates for women borrowers and eco-friendly homes.",
    faq: [
      {
        question: "What is the interest rate for women?",
        answer: "Women borrowers get 0.05% concession on applicable rates.",
      },
      {
        question: "Is PMAY benefit available?",
        answer: "Yes, eligible customers can avail PMAY interest subsidy.",
      },
      {
        question: "What types of properties are covered?",
        answer:
          "Ready properties, under-construction, plot purchase, and self-construction.",
      },
    ],
    terms: {
      prepayment_penalty: "Nil for floating rate loans",
      late_payment_fee: "2% p.a. on overdue amount",
      processing_time: "7-14 days",
      eligibility_criteria: [
        "Age 18-65 years",
        "Stable income",
        "Clear title property",
      ],
      required_documents: [
        "Income proof",
        "Property papers",
        "Identity/Address proof",
        "Photos",
      ],
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "MoneyTap Credit Line",
    bank: "MoneyTap",
    type: "credit_line",
    rate_apr: 15.0,
    min_income: 20000,
    min_credit_score: 650,
    tenure_min_months: 2,
    tenure_max_months: 36,
    processing_fee_pct: 0,
    prepayment_allowed: true,
    disbursal_speed: "instant",
    docs_level: "minimal",
    summary:
      "App-based personal credit line. Withdraw any amount from your approved limit anytime with instant transfer to bank account.",
    faq: [
      {
        question: "How do I access funds?",
        answer:
          "Simply open the app and transfer any amount to your bank account instantly.",
      },
      {
        question: "What is the minimum withdrawal?",
        answer: "You can withdraw as low as ₹3,000 at a time.",
      },
      {
        question: "How is EMI calculated?",
        answer:
          "You choose your EMI tenure (2-36 months) for each withdrawal separately.",
      },
    ],
    terms: {
      prepayment_penalty: "None",
      late_payment_fee: "₹500 + GST per instance",
      processing_time: "Instant",
      eligibility_criteria: [
        "Age 21-57 years",
        "Minimum salary ₹20,000",
        "Smartphone with internet",
      ],
      required_documents: ["PAN", "Aadhaar", "Bank account linking"],
    },
  },
];

/**
 * SQL migration script for Supabase
 */
export const migrationSQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('personal', 'education', 'vehicle', 'home', 'credit_line', 'debt_consolidation')),
  rate_apr NUMERIC(5,2) NOT NULL CHECK (rate_apr >= 0 AND rate_apr <= 100),
  min_income NUMERIC(12,2) NOT NULL CHECK (min_income >= 0),
  min_credit_score INTEGER NOT NULL CHECK (min_credit_score >= 300 AND min_credit_score <= 900),
  tenure_min_months INTEGER NOT NULL DEFAULT 6 CHECK (tenure_min_months >= 1),
  tenure_max_months INTEGER NOT NULL DEFAULT 60 CHECK (tenure_max_months >= tenure_min_months),
  processing_fee_pct NUMERIC(4,2) DEFAULT 0 CHECK (processing_fee_pct >= 0 AND processing_fee_pct <= 10),
  prepayment_allowed BOOLEAN DEFAULT TRUE,
  disbursal_speed TEXT DEFAULT 'standard' CHECK (disbursal_speed IN ('instant', 'fast', 'standard', 'slow')),
  docs_level TEXT DEFAULT 'standard' CHECK (docs_level IN ('minimal', 'standard', 'extensive')),
  summary TEXT NOT NULL,
  faq JSONB DEFAULT '[]',
  terms JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  income NUMERIC(12,2),
  credit_score INTEGER CHECK (credit_score >= 300 AND credit_score <= 900),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Chat Messages table
CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_bank ON products(bank);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_rate_apr ON products(rate_apr);
CREATE INDEX IF NOT EXISTS idx_ai_chat_messages_user_product ON ai_chat_messages(user_id, product_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for products (public read)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Policies for users (own data only)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policies for chat messages (own messages only)
CREATE POLICY "Users can view own chat messages" ON ai_chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages" ON ai_chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);
`;


