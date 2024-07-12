import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const origin = requestUrl.origin;

  if (!token_hash || !type)
    return NextResponse.redirect(
      `${origin}/login?error=Unable to sign in. Please try again.`
    );

  const supabase = createClient();
  const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error || !data.session?.access_token || !data.session?.refresh_token)
    return NextResponse.redirect(
      `${origin}/login?error=${
        error?.message ?? "Unable to sign in. Please try again."
      }`
    );

  const { error: errorData } = await supabase.auth.setSession({
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
  if (errorData)
    return NextResponse.redirect(`${origin}/login?error=${errorData.message}`);

  // console.log("Data:", data);
  // URL to redirect to after sign up process completes
  return NextResponse.redirect(origin);
}
