"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Github,
  Chrome,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(
    error === "auth_callback_failed" ? "Authentication failed. Please try again." : null
  );

  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setAuthError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${redirect}`,
        },
      });

      if (error) {
        setAuthError(error.message);
        setIsLoading(false);
      }
    } catch {
      setAuthError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  // Demo login for testing without Supabase
  const handleDemoLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to access your personalized loan dashboard
        </p>
      </div>

      {/* Auth Form */}
      <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 space-y-6">
        {/* Error Alert */}
        {authError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() => handleOAuthLogin("github")}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            or continue with email
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Demo Login */}
        <div className="pt-2">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={handleDemoLogin}
          >
            Continue without account (Demo)
          </Button>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">LoanPicks</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center py-12">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
