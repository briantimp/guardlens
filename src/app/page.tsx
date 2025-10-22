import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = getServerSupabaseClient();

  if (!supabase) {
    redirect("/dashboard?demo=1");
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    redirect("/login");
  }

  redirect("/dashboard");
}
