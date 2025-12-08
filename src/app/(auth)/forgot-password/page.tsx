"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LP</span>
              </div>
              <span className="font-semibold text-lg">Loan Picks</span>
            </Link>
          </nav>
        </header>

        {/* Success Message */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-12">
          <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription className="text-base">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-teal-500/20 bg-teal-500/10">
                <Mail className="h-4 w-4 text-teal-500" />
                <AlertDescription className="text-sm">
                  Click the link in the email to reset your password. The link will expire in 24 hours.
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground text-center">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-teal-500 hover:text-teal-400 underline underline-offset-4"
                >
                  try again
                </button>
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LP</span>
            </div>
            <span className="font-semibold text-lg">Loan Picks</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-12">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Forgot password?</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-teal-500 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

