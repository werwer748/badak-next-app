/*
  proxy.ts(Edge Runtime) · Server Action · 클라이언트 컴포넌트가 모두 import하는 파일이라
  Node API나 무거운 의존성 없이 상수와 순수 함수만 둬요.
*/

export const AUTH_COOKIE_NAME = 'auth-token'

/*
  실제 인증이 아니라 학습용 더미 토큰이에요.
  proxy.ts는 값 검증 없이 쿠키의 "존재 여부"만 보고 통과시켜요.
*/
export const AUTH_COOKIE_VALUE = 'demo-token'

export const PROTECTED_PATHS = ['/dashboard']

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path))
}

/*
  document.cookie 문자열("a=1; b=2")에서 auth-token 유무를 판별해요.
  includes를 쓰면 'my-auth-token=1' 같은 다른 쿠키에 오탐이 나서 prefix로 비교해요.
*/
export function hasAuthCookie(cookieString: string) {
  return cookieString
    .split('; ')
    .some((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`))
}

/*
  로그인 후 돌아갈 경로 검증.
  '//evil.com'은 브라우저가 프로토콜 상대 URL(https://evil.com)로 해석하기 때문에
  '/'로 시작하는 것만으로는 부족하고 '//'는 따로 막아야 해요. (오픈 리다이렉트 방지)
*/
export function safeRedirectTarget(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  if (!raw.startsWith('/') || raw.startsWith('//')) return null
  return raw
}
