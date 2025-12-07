# LoanPicks Dashboard

A modern, AI-powered loan products dashboard built with Next.js 14+, TypeScript, and Tailwind CSS.

![LoanPicks Dashboard](https://via.placeholder.com/800x400?text=LoanPicks+Dashboard)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Dashboard  │  │  All Products│  │    AI Chat Sheet     │  │
│  │   (Top 5)    │  │   (Filters)  │  │  (Product Q&A)       │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │              │
│         └────────────┬────┴──────────────────────┘              │
│                      │                                          │
│              ┌───────▼───────┐                                  │
│              │  React State  │                                  │
│              │  & Hooks      │                                  │
│              └───────┬───────┘                                  │
└──────────────────────┼──────────────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │  Next.js API    │
              │  Route Handlers │
              └────────┬────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│  /api/      │ │  /api/ai/   │ │  /api/auth/ │
│  products   │ │  ask        │ │  callback   │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       │        ┌──────▼──────┐        │
       │        │  OpenAI API │        │
       │        │  (GPT-3.5)  │        │
       │        └─────────────┘        │
       │                               │
       └───────────────┬───────────────┘
                       │
              ┌────────▼────────┐
              │    Supabase     │
              │  (PostgreSQL)   │
              │  + Auth         │
              └─────────────────┘
```

## 🚀 Features

### Dashboard (Top 5 Personalized Products)
- **Best Match Card**: Highlighted top recommendation based on user profile
- **Match Score**: Percentage-based matching algorithm
- **Dynamic Badges**: Auto-generated badges based on product attributes:
  - Low APR (≤8%)
  - No Prepayment Penalty
  - Fast/Instant Disbursal
  - Minimal Docs
  - Flexible Tenure
  - Zero Processing Fee
  - Credit Score Requirements
  - Income Eligibility

### All Products Page
- Grid and List view modes
- Advanced filtering:
  - Bank search (autocomplete)
  - Loan type selection
  - APR range slider
  - Income requirements
  - Credit score requirements
- Real-time filter updates

### AI Chat Integration
- Product-specific Q&A
- Grounded responses (AI only uses product data)
- Conversation history
- Suggested questions
- Fallback responses when AI unavailable

### Authentication
- OAuth support (Google, GitHub)
- Email/password authentication
- Session management via Supabase
- Protected routes via middleware

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| UI Library | shadcn/ui + Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| Validation | Zod |
| AI | OpenAI GPT-3.5 Turbo |
| Authentication | Supabase Auth |

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account (free tier)
- OpenAI API key (free tier available)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/loanpicks.git
   cd loanpicks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   
   Run the migration SQL in your Supabase SQL editor:
   ```bash
   # Copy contents from src/lib/seed-data.ts (migrationSQL export)
   ```

5. **Seed the database**
   
   Insert the seed products into your Supabase database using the seed data in `src/lib/seed-data.ts`.

6. **Start the development server**
```bash
npm run dev
   ```

7. **Open** http://localhost:3000

## 🏷️ Badge Logic

Badges are automatically generated based on product attributes:

| Badge | Condition |
|-------|-----------|
| Low APR | `rate_apr ≤ 8%` |
| Competitive Rate | `rate_apr ≤ 12%` |
| No Prepayment Penalty | `prepayment_allowed = true` |
| Instant Disbursal | `disbursal_speed = 'instant'` |
| Fast Disbursal | `disbursal_speed = 'fast'` |
| Minimal Docs | `docs_level = 'minimal'` |
| Low Credit Score OK | `min_credit_score ≤ 650` |
| Flexible Tenure | `tenure_max - tenure_min ≥ 48 months` |
| Zero Processing Fee | `processing_fee_pct = 0` |
| Income Eligible | Based on `min_income` threshold |

See `src/lib/badges.ts` for full implementation.

## 🤖 AI Grounding Strategy

The AI chat is **grounded** to specific product data:

1. **System Prompt**: Instructs AI to ONLY answer based on provided data
2. **Context Injection**: Product details serialized and included in every request
3. **Hallucination Prevention**: Explicit instructions to say "I don't have that information"
4. **Field Citation**: AI mentions which fields it used
5. **Fallback Responses**: Graceful handling when AI unavailable

```typescript
// Example grounding in src/lib/ai.ts
const SYSTEM_PROMPT = `You MUST only answer based on the product information provided.
If asked about something not in the data, say "I don't have that specific information"`;
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, signup)
│   ├── (dashboard)/      # Protected pages (dashboard, products, profile)
│   ├── api/              # API routes
│   │   ├── products/     # GET /api/products
│   │   ├── ai/ask/       # POST /api/ai/ask
│   │   └── auth/         # OAuth callbacks
│   ├── globals.css       # Global styles + theme
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── product-card.tsx  # Loan product card
│   ├── chat-sheet.tsx    # AI chat drawer
│   ├── product-filters.tsx
│   └── header.tsx
├── lib/
│   ├── supabase/         # Supabase client setup
│   ├── validations.ts    # Zod schemas
│   ├── badges.ts         # Badge generation logic
│   ├── ai.ts             # OpenAI integration
│   └── seed-data.ts      # Mock data + SQL migrations
└── types/
    └── database.ts       # TypeScript interfaces
```

## 🔒 Security

- **OAuth**: Secure authentication via Supabase
- **Middleware**: Protected routes require authentication
- **Row Level Security**: Database policies restrict data access
- **Zod Validation**: All API inputs validated
- **No `any` Types**: Strict TypeScript throughout

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation (hamburger menu on mobile)
- Chat drawer adapts to screen size
- Grid layouts adjust to viewport
- Touch-friendly interactions

## 🎨 Design System

Custom dark theme with teal accent:
- **Primary**: `oklch(0.72 0.15 175)` (Teal)
- **Background**: `oklch(0.13 0.01 260)` (Dark blue-gray)
- **Card**: `oklch(0.16 0.015 260)`
- **Animations**: Fade-in-up, stagger effects, pulse indicators

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
OPENAI_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📝 API Documentation

### GET /api/products

Fetch all products with optional filters.

**Query Parameters:**
- `bank` (string): Filter by bank name (partial match)
- `type` (string): Filter by loan type
- `minApr` (number): Minimum APR
- `maxApr` (number): Maximum APR
- `minIncome` (number): Maximum required income
- `minCreditScore` (number): Maximum required credit score

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
  "message": "What is the minimum credit score?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "response": "The minimum credit score required is 700...",
  "citedFields": ["min_credit_score", "terms"]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the ClickPe Frontend Intern Assessment
# clickpe.ai-frontend
