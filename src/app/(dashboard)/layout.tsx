import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      user = {
        email: data.user.email ?? "",
        display_name: data.user.user_metadata?.display_name ?? null,
      };
    }
  } catch {
    // Supabase not configured, continue without user
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Header user={user} />
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-8">{children}</main>
    </div>
  );
}

