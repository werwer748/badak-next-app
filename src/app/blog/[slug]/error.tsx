'use client';
// 파일명: errors 로 하면 global-error 확인 가능
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-red-500">포스트를 불러오지 못했어요</h1>
      <p className="text-gray-600">{error.message}</p>
      <div className="flex gap-3">
        <Button onClick={reset}>다시 시도하기</Button>
        <Button variant="outline" asChild>
          <Link href="/blog">목록으로</Link>
        </Button>
      </div>
    </main>
  );
}