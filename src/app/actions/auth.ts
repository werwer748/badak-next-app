'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
  isProtectedPath,
  safeRedirectTarget,
} from '@/lib/auth';

export type AuthState = {
  message: string
  loggedIn: boolean
}

/*
  실무라면 httpOnly: true로 막아서 JS가 토큰을 못 읽게 해야 해요.
  여기서는 하단 전역 토글 버튼이 document.cookie로 현재 상태를 읽어야 해서 false로 뒀어요.
  (root layout에서 cookies()를 읽으면 모든 페이지가 동적 렌더링으로 바뀌기 때문에 피한 선택이에요)
*/
const AUTH_COOKIE_OPTIONS = {
  httpOnly: false,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60, // 1시간
} as const;

/*
  cookies()는 Next 15부터 async 함수라 await이 필요해요.
  그리고 쿠키 쓰기(set/delete)는 렌더링 중에는 못 하고
  Server Action이나 Route Handler에서만 가능해요.
*/
export async function login(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, AUTH_COOKIE_OPTIONS);

  // proxy가 붙여준 ?redirect=원래경로 로 복귀
  const target = safeRedirectTarget(formData.get('redirect'));
  if (target) {
    redirect(target); // never를 반환해서 아래 코드는 실행되지 않아요
  }

  return {
    message: '로그인 처리했어요. 이제 /dashboard에 접근할 수 있어요.',
    loggedIn: true,
  };
}

/*
  전역 토글 버튼용. 클라이언트가 보낸 상태를 믿지 않고
  서버가 실제 쿠키를 보고 심을지 지울지 결정해요.
*/
export async function toggleAuth(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const cookieStore = await cookies();
  const currentPath = safeRedirectTarget(formData.get('path')) ?? '/';

  if (cookieStore.has(AUTH_COOKIE_NAME)) {
    cookieStore.delete(AUTH_COOKIE_NAME);

    // 보호된 경로에서 로그아웃했으면 그 자리에서 가드에 걸리는 걸 보여줘요.
    // proxy와 똑같이 복귀 경로를 남겨서 바로 다시 로그인해볼 수 있게 해요.
    if (isProtectedPath(currentPath)) {
      redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }

    return { message: '로그아웃 처리했어요', loggedIn: false };
  }

  cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, AUTH_COOKIE_OPTIONS);

  return { message: '로그인 처리했어요', loggedIn: true };
}
