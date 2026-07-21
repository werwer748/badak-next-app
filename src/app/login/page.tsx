import { StudyNote } from '@/components/StudyNote'

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-muted-foreground">proxy.ts 인증 체크 테스트 페이지예요.</p>
      <div className="w-full max-w-md">
        <StudyNote id="login" />
      </div>
    </main>
  );
}