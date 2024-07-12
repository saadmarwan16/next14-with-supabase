"use server";

import { ActionMessages } from "@/lib/constants/actionMessages";
import { actionClient } from "@/lib/safeAction";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/lib/types/auth";

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
