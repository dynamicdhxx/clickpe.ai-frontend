import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoanPicks - Find Your Perfect Loan",
  description:
    "Discover personalized loan products tailored to your needs. Compare rates, explore options, and make informed financial decisions.",
  keywords: ["loan", "personal loan", "home loan", "education loan", "finance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
