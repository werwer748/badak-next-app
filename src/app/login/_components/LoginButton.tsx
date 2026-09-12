'use client'

import { useActionState } from 'react'
import { login, type AuthState } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'

const initialState: AuthState = {
  message: '',
  loggedIn: false,
}

export default function LoginButton({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="space-y-3">
      {/* proxy가 붙여준 복귀 경로를 그대로 Server Action에 넘겨요 */}
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? '처리 중...' : '로그인 처리'}
      </Button>
      {state.message && (
        <p className="text-sm text-primary">{state.message}</p>
      )}
    </form>
  )
}
