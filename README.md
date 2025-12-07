# LoanPicks Dashboard

A modern, AI-powered loan products dashboard built with Next.js 14+, TypeScript, Supabase, and Google Gemini AI.

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │    Dashboard     │  │   All Products   │  │   AI Chat Sheet  │  │
│  │   (Top 5 Picks)  │  │   (Grid + Filter)│  │  (Product Q&A)   │  │
│  │                  │  │                  │  │                  │  │
│  │  • Best Match    │  │  • Bank Search   │  │  • Grounded AI   │  │
│  │  • Match Score   │  │  • APR Range     │  │  • Chat History  │  │
│  │  • Dynamic Badges│  │  • Income Filter │  │  • Suggestions   │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │            │
│           └──────────────┬──────┴─────────────────────┘            │
│                          │                                         │
│                  ┌───────▼───────┐                                 │
│                  │  React State  │                                 │
│                  │  (useState)   │                                 │
│                  └───────┬───────┘                                 │
│                          │                                         │
└──────────────────────────┼─────────────────────────────────────────┘
                           │
                   ┌───────▼───────┐
                   │   Next.js     │
                   │ API Routes    │
                   └───────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
│ GET /api/     │  │ POST /api/ai/ │  │ /api/auth/    │
│ products      │  │ ask           │  │ callback      │
│               │  │               │  │               │
│ • Fetch all   │  │ • Product Q&A │  │ • OAuth flow  │
│ • Filters     │  │ • Grounding   │  │ • Session     │
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
        │          ┌───────▼───────┐          │
        │          │ Google Gemini │          │
        │          │ (gemini-1.5-  │          │
        │          │  flash)       │          │
        │          └───────────────┘          │
        │                                     │
        └──────────────────┬──────────────────┘
                           │
                   ┌───────▼───────┐
                   │   Supabase    │
                   │  PostgreSQL   │
                   │  + Auth       │
                   │               │
                   │  Tables:      │
                   │  • products   │
                   │  • users      │
                   │  • ai_chat_   │
                   │    messages   │
                   └───────────────┘
```

## 🚀 Features

### 1. Dashboard (Top 5 Personalized Products)
- **Best Match Card**: Highlighted top recommendation with match percentage
- **Match Score Algorithm**: Based on APR, income eligibility, credit score fit
- **Dynamic Badges**: 3-5 auto-generated badges per product
- **"Ask About Product"**: Opens AI chat for that specific loan

### 2. All Products Page
- Grid and List view toggle
- Real-time filters:
  - Bank search (autocomplete)
  - Loan type dropdown
  - APR range slider
  - Income filter
  - Credit score filter

### 3. AI Chat Integration
- Product-specific Q&A powered by **Google Gemini**
- **Grounded responses** - AI only uses provided product data
- Conversation history maintained
- Suggested questions for quick start
- Fallback system when AI unavailable

### 4. Authentication
- Google OAuth via Supabase
- Email/password authentication
- Session management
- Protected routes via middleware

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict, no `any`) |
| UI Library | shadcn/ui + Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| Validation | Zod |
| AI | Google Gemini (gemini-1.5-flash) |
| Auth | Supabase Auth (OAuth) |
| Deployment | Vercel |

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- Supabase account (free tier)
- Google AI Studio account (free tier)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/loanpicks.git
cd loanpicks
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini AI (Optional - falls back to rule-based responses)
GEMINI_API_KEY=your-gemini-api-key
```

**Get your keys:**
- Supabase: https://supabase.com → Project Settings → API
- Gemini: https://aistudio.google.com/app/apikey

### 3. Set Up Database

1. Go to Supabase Dashboard → **SQL Editor**
2. Run the migration:

```sql
-- Copy contents from: supabase/migrations/001_initial_schema.sql
```

3. Seed the data (15 loan products):

```sql
-- Copy contents from: supabase/seed.sql
```

### 4. Configure Google OAuth (Optional)

1. Google Cloud Console → Create OAuth credentials
2. Add redirect URI: `https://your-project.supabase.co/auth/v1/callback`
3. Supabase Dashboard → Authentication → Providers → Enable Google

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 🏷️ Badge Logic

Badges are automatically generated in `src/lib/badges.ts`:

| Badge | Condition | Icon |
|-------|-----------|------|
| **Low APR** | `rate_apr ≤ 8%` | percent |
| **Competitive Rate** | `rate_apr ≤ 12%` | trending-down |
| **No Prepayment Penalty** | `prepayment_allowed = true` | check-circle |
| **Instant Disbursal** | `disbursal_speed = 'instant'` | zap |
| **Fast Disbursal** | `disbursal_speed = 'fast'` | clock |
| **Minimal Docs** | `docs_level = 'minimal'` | file-minus |
| **Low Credit Score OK** | `min_credit_score ≤ 650` | shield-check |
| **Flexible Tenure** | `tenure_max - tenure_min ≥ 48` | calendar |
| **Zero Processing Fee** | `processing_fee_pct = 0` | gift |
| **Income Eligible** | Based on `min_income` | wallet |

### Match Score Calculation

```typescript
// Base score: 50 points
// APR bonus: up to 20 points (lower APR = more points)
// Eligibility bonus: up to 40 points (income + credit score fit)
// Feature bonus: up to 25 points (prepayment, speed, docs, fees)
// Max score: 100
```

## 🤖 AI Grounding Strategy

The AI chat uses a **grounded approach** to prevent hallucinations:

### 1. System Prompt Injection
```typescript
const systemPrompt = `You MUST only answer based on the product data below.
If asked about something not in the data, say "I don't have that information."`;
```

### 2. Product Context
All product fields are serialized and injected:
- Name, Bank, Type
- APR, Income, Credit Score requirements
- Tenure, Processing Fee, Prepayment terms
- FAQs from database
- Terms & Conditions

### 3. Response Generation
```
User Question → Gemini API → Grounded Response
                    ↑
            Product Data Context
```

### 4. Fallback System
If Gemini API fails or isn't configured:
- **Keyword matching** detects question intent
- **Rule-based responses** from product fields
- Always provides helpful product information

### 5. Cited Fields
Response includes which fields were used:
```json
{
  "response": "The minimum credit score is 700...",
  "citedFields": ["min_credit_score", "terms"]
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, Signup pages
│   ├── (dashboard)/         # Dashboard, Products, Profile
│   ├── api/
│   │   ├── products/        # GET /api/products
│   │   ├── ai/ask/          # POST /api/ai/ask
│   │   └── auth/            # OAuth callbacks
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── product-card.tsx     # Loan product card
│   ├── chat-sheet.tsx       # AI chat drawer
│   ├── product-filters.tsx  # Filter controls
│   └── header.tsx           # Navigation header
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── ai.ts                # Gemini AI integration
│   ├── badges.ts            # Badge generation
│   ├── validations.ts       # Zod schemas
│   └── seed-data.ts         # Fallback mock data
├── types/
│   └── database.ts          # TypeScript interfaces
└── supabase/
    ├── migrations/          # SQL schema
    └── seed.sql             # 15 loan products
```

## 🚢 Deployment (Vercel)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel
1. Go to vercel.com
2. Import your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`

### 3. Deploy
Click Deploy - Vercel handles the rest!

## 📝 API Documentation

### GET /api/products

Fetch products with optional filters.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| bank | string | Filter by bank name |
| type | string | Loan type filter |
| minApr | number | Minimum APR |
| maxApr | number | Maximum APR |
| minIncome | number | Max required income |
| minCreditScore | number | Max required score |

**Response:**
```json
{
  "products": [...],
  "banks": ["HDFC Bank", "SBI", ...],
  "total": 15
}
```

### POST /api/ai/ask

Product Q&A via AI.

**Request:**
```json
{
  "productId": "uuid",
  "message": "What documents do I need?",
  "history": []
}
```

**Response:**
```json
{
  "response": "The required documents are...",
  "source": "gemini",
  "citedFields": ["terms", "docs_level"]
}
```

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu on mobile
- Chat drawer full-width on mobile
- Grid adjusts: 1 → 2 → 3 columns
- Touch-friendly controls

## 🎨 Design System

Dark theme with teal accent:
- **Primary**: Teal (`oklch(0.72 0.15 175)`)
- **Background**: Dark blue-gray
- **Cards**: Glassmorphism effect
- **Animations**: Fade-in-up, stagger reveals

---

Built for ClickPe Frontend Assessment
