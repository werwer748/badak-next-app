import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, isProtectedPath } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. 로깅
  console.log(request.url);
  console.log(`[proxy] ${request.method} ${pathname}`);
  
  //2. 인증 체크
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  
  if (isProtectedPath(pathname) && !token) {
    /*
      원래 가려던 경로를 ?redirect= 로 남겨둬야
      로그인 후 그 경로로 다시 돌려보낼 수 있어요.
    */
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // 3. 보안 헤더 추가?
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * 아래 경로 제외하고 전부 실행
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico
     * - public 폴더
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
