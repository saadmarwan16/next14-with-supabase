"use server";

import { ActionMessages } from "@/lib/constants/actionMessages";
import { actionClient } from "@/lib/safeAction";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/lib/types/auth";
import { redirect } from "next/navigation";

export const login = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: parsedInput.email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    if (error) throw error;

    return ActionMessages.LOGIN_SUCCESS;
  });

export const loginWithGoogle = actionClient.action(async () => {
  throw new Error('This ain\'t implemented yet');
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback?type=${ActionMessages.GOOGLE_LOGIN_PROVIDER}`,
    },
  });
  if (error) throw error;

  // redirect(data.url);
});
