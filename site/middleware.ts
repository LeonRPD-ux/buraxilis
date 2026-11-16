import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/dictionaries";

/**
 * Kök ünvanı (`/`) istifadəçinin dilinə uyğun səhifəyə yönləndirir.
 * Yalnız `/` üçün işləyir, digər bütün sorğular toxunulmaz qalır.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = request.cookies.get("lang")?.value;
  let target = "az";

  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    target = cookieLocale;
  } else {
    const header = request.headers.get("accept-language") ?? "";
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    const match = preferred.find((code) => (locales as readonly string[]).includes(code));
    if (match) target = match;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${target}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"],
};
