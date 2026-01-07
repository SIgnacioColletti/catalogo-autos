import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // CRÍTICO: Refrescar la sesión
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  console.log("Middleware:", {
    path: request.nextUrl.pathname,
    hasUser: !!user,
    email: user?.email,
  });

  // Si está en login y tiene sesión, redirigir a admin
  if (isLoginPage && user) {
    const url = new URL("/admin", request.url);
    return NextResponse.redirect(url);
  }

  // Si está en admin (no login) y NO tiene sesión, redirigir a login
  if (isAdminPage && !isLoginPage && !user) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
