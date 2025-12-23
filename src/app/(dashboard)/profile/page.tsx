"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  IndianRupee,
  Shield,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("Demo User");
  const [income, setIncome] = useState("50000");
  const [creditScore, setCreditScore] = useState("720");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // In a real app, this would update the user's profile in Supabase
      // For demo purposes, we'll just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch {
      // If Supabase is not configured, just redirect
      router.push("/login");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-7 w-7 text-primary" />
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and loan preferences
        </p>
      </div>

      {/* Success/Error Alerts */}
      {success && (
        <Alert className="bg-primary/10 border-primary/20">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            Profile saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Form */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and loan matching preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="pl-9"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value="demo@loanpicks.com"
                className="pl-9"
                disabled
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-4">Loan Matching Preferences</h3>
            <p className="text-xs text-muted-foreground mb-4">
              These values are used to calculate your personalized loan matches
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Income */}
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income (₹)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-9"
                    placeholder="50000"
                    min={0}
                  />
                </div>
              </div>

              {/* Credit Score */}
              <div className="space-y-2">
                <Label htmlFor="creditScore">Credit Score</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="creditScore"
                    type="number"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="pl-9"
                    placeholder="720"
                    min={300}
                    max={900}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Score between 300-900
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-card/50 backdrop-blur-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg text-destructive">Account Actions</CardTitle>
          <CardDescription>
            Sign out of your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}





