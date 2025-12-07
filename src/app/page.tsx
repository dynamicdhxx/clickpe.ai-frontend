import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  TrendingDown,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen gradient-mesh">
      {/* Navigation */}
      <nav className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl">LoanPicks</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-Powered Loan Matching</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Find Your{" "}
            <span className="text-gradient">Perfect Loan</span>
            <br />
            in Minutes
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover personalized loan products from top banks. Compare rates,
            get AI-powered insights, and make informed financial decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2 h-12 px-8 text-base">
                Start Exploring
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                View All Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          <FeatureCard
            icon={TrendingDown}
            title="Best Rates"
            description="Compare APRs across 15+ loan products and find the lowest rates for your profile."
          />
          <FeatureCard
            icon={MessageCircle}
            title="AI Assistant"
            description="Ask questions about any loan product and get instant, accurate answers."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Your data is encrypted and never shared. We prioritize your privacy."
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto">
          <StatCard value="15+" label="Loan Products" />
          <StatCard value="10+" label="Partner Banks" />
          <StatCard value="7%" label="Lowest APR" />
          <StatCard value="24/7" label="AI Support" />
        </div>

        {/* How It Works */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Create Account"
              description="Sign up in seconds with your email or social account."
            />
            <StepCard
              step={2}
              title="Get Matched"
              description="View personalized loan recommendations based on your profile."
            />
            <StepCard
              step={3}
              title="Apply with Confidence"
              description="Use AI chat to understand every detail before applying."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 max-w-3xl mx-auto text-center">
          <div className="gradient-border p-8 md:p-12 rounded-2xl bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Perfect Loan?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who found their ideal loan through LoanPicks.
            </p>
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 mt-20 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">LoanPicks</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 LoanPicks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 card-hover">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-6 rounded-2xl bg-card/50 border border-border/50">
      <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
        {step}
      </div>
      <div className="pt-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
