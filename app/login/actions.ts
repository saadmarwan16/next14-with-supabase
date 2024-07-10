"use server";

import { ActionMessages } from "@/lib/constants/actionMessages";
import { actionClient } from "@/lib/safeAction";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema, SignUpSchema } from "@/lib/types/auth";
import { headers } from "next/headers";

export const login = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(parsedInput);
    if (error) throw error;

    return ActionMessages.LOGIN_SUCCESS;
  });

export const signUp = actionClient
  .schema(SignUpSchema)
  .action(async ({ parsedInput }) => {
    const origin = headers().get("origin");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: parsedInput.email,
      password: parsedInput.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) throw error;

    return ActionMessages.SIGNUP_SUCCESS;
  });
