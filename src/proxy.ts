import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. 로깅
  console.log(request.url);
  console.log(`[proxy] ${request.method} ${pathname}`);
  
  //2. 인증 체크
  const token = request.cookies.get('auth-token')?.value;
  console.log('????:', token);
  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some((path) => {
    return pathname.startsWith(path);
  });
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
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