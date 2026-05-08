'use client';

import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
    <body>
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-red-500">심각한 오류가 발생했어요</h1>
      <p className="text-gray-600">{error.message}</p>
      <Button onClick={reset}>다시 시도하기</Button>
    </main>
    </body>
    </html>
  );
}