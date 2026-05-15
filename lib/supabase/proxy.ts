import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  APP_LOGIN_AT_COOKIE,
  hasAppSessionExpired,
} from "@/lib/auth/session-policy";
import { normalizeProfileStatus } from "@/lib/auth/profile";
import {
  getSupabasePublicKey,
  getSupabaseUrl,
} from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublicKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith("/app");
  const isLoginRoute = pathname.startsWith("/login");
  const isRegisterRoute = pathname.startsWith("/cadastro");
  const isHomeRoute = pathname === "/";
  const isWaitingRoute = pathname.startsWith("/aguardando-aprovacao");
  const isBlockedRoute = pathname.startsWith("/acesso-bloqueado");
  const appSessionExpired =
    Boolean(user) &&
    hasAppSessionExpired(request.cookies.get(APP_LOGIN_AT_COOKIE)?.value);
  const { data: profile } = user
    ? await supabase
        .from("app_profiles")
        .select("status")
        .eq("id", user.id)
        .maybeSingle<{ status: string }>()
    : { data: null };
  const status = user ? normalizeProfileStatus(profile?.status) : null;

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (user && appSessionExpired && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "session-expired");
    return NextResponse.redirect(url);
  }

  if (user && status === "pending" && !appSessionExpired && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/aguardando-aprovacao";
    return NextResponse.redirect(url);
  }

  if (user && status === "blocked" && !appSessionExpired && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/acesso-bloqueado";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    status === "active" &&
    !appSessionExpired &&
    (isLoginRoute ||
      isRegisterRoute ||
      isHomeRoute ||
      isWaitingRoute ||
      isBlockedRoute)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    status === "pending" &&
    !appSessionExpired &&
    (isLoginRoute || isRegisterRoute || isHomeRoute)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/aguardando-aprovacao";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    status === "blocked" &&
    !appSessionExpired &&
    (isHomeRoute || isWaitingRoute || isLoginRoute || isRegisterRoute)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/acesso-bloqueado";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
