import { ActionMessages } from "@/lib/constants/actionMessages";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const type = requestUrl.searchParams.get("type");
  if (type === ActionMessages.GOOGLE_LOGIN_PROVIDER) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";
    if (!code) {
      return NextResponse.redirect(
        `${origin}/login?error=Unable to sign in. Please try again.`
      );
    }

    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        `${origin}/login?error=${
          error.message ?? "Unable to sign in. Please try again."
        }`
      );
    }

    return NextResponse.redirect(`${origin}${next}`);
  }

  if (type === ActionMessages.MAGIC_LINK_LOGIN_PROVIDER) {
    const token_hash = requestUrl.searchParams.get("token_hash");
    const origin = requestUrl.origin;
    if (!token_hash)
      return NextResponse.redirect(
        `${origin}/login?error=Unable to sign in. Please try again.`
      );

    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });
    if (error || !data.session)
      return NextResponse.redirect(
        `${origin}/login?error=${
          error?.message ?? "Unable to sign in. Please try again."
        }`
      );

    return NextResponse.redirect(origin);
  }

  return NextResponse.redirect(
    `${origin}/login?error=Invalid login provider. Please try again.`
  );
}
