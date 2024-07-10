'use server';

import { actionClient } from "@/lib/safeAction";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const signOut = actionClient.action(async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
});
