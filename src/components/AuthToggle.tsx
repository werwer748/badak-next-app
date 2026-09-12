'use client'

import { useActionState, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut } from 'lucide-react'
import { toggleAuth, type AuthState } from '@/app/actions/auth'
import { hasAuthCookie } from '@/lib/auth'
import { cn } from '@/lib/utils'

const initialState: AuthState = {
  message: '',
  loggedIn: false,
}

/*
  auth-token 쿠키를 미리 심거나 지우는 데모용 토글이에요.
  쓰기는 Server Action(cookies().set)이 하고, 현재 상태만 클라이언트에서 읽어요.
  root layout에서 cookies()를 읽으면 모든 페이지가 동적 렌더링으로 바뀌어서 이렇게 나눴어요.
*/
export default function AuthToggle({ className }: { className?: string }) {
  const pathname = usePathname()
  const [state, formAction, isPending] = useActionState(toggleAuth, initialState)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  /*
    이 컴포넌트는 root layout에 있어서 클라이언트 네비게이션 중에는 unmount되지 않아요.
    그래서 deps가 []이면 /login에서 로그인한 뒤에도 라벨이 그대로예요.
    pathname은 페이지 이동, state는 액션 직후를 잡기 위한 deps예요.
  */
  useEffect(() => {
    setLoggedIn(hasAuthCookie(document.cookie))
  }, [pathname, state])

  return (
    <form action={formAction}>
      <input type="hidden" name="path" value={pathname} />
      <button
        type="submit"
        disabled={isPending}
        /* 마운트 전에는 상태를 모르니 자리만 잡아두고 숨겨요 (라벨 깜빡임 방지) */
        className={cn(className, 'disabled:opacity-60', loggedIn === null && 'invisible')}
      >
        {loggedIn ? <LogOut className="size-5" /> : <LogIn className="size-5" />}
        {isPending ? '처리 중...' : loggedIn ? '로그아웃 처리' : '로그인 처리'}
      </button>
    </form>
  )
}
