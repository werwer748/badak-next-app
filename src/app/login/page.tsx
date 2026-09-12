import { StudyNote } from '@/components/StudyNote'
import LoginButton from './_components/LoginButton'
import { safeRedirectTarget } from '@/lib/auth'

type Props = {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams
  // proxy가 붙여준 값이라도 그대로 믿지 않고 내부 경로인지 한 번 걸러요
  const redirectTo = safeRedirectTarget(redirect)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-muted-foreground">proxy.ts 인증 체크 테스트 페이지예요.</p>
      <div className="w-full max-w-md">
        <div className="mb-8 rounded-xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed">
            실제 인증이 아니라 <code className="font-mono">auth-token</code> 쿠키를 심는 데모 버튼이에요.
            proxy.ts는 값 검증 없이 이 쿠키의 존재 여부만 보고 통과시켜요.
          </p>
          {redirectTo && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              로그인 처리하면 원래 가려던 <code className="font-mono">{redirectTo}</code> 로 돌아가요.
            </p>
          )}
          <div className="mt-4">
            <LoginButton redirectTo={redirectTo ?? undefined} />
          </div>
        </div>
        <StudyNote id="login" />
      </div>
    </main>
  );
}
