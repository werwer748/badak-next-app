/*
* 모든 페이지를 감싸는 껍데기
  HTML의 <html>, <body> 태그가 여기 들어가요.
  헤더, 네비게이션처럼 모든 페이지에서 공통으로 보이는 것들도 여기에 넣어요.
  페이지가 바뀌어도 layout은 다시 렌더링되지 않아요. 이게 Pages Router랑 결정적으로 다른 점이에요.
*/
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import './global.css';
import QueryProvider from "@/providers/QueryProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Badak Next App',
    template: '%s | Badak Next App',
  },
  description: '바닥부터 만들어보는 Next 프로젝트'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-background to-transparent" />
        <Link
          href="/"
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-base text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
        >
          <Home className="size-5" />
          홈으로
        </Link>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}