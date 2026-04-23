'use client';

import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('QueryProvider 렌더링됨') // ← 추가

  //  react에서는 const queryClient = new QueryClient()로 사용
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // fetch해온 데이터가 "신선하다"고 간주하는 시간이에요.
        gcTime: 1000 * 60 * 5, // 캐시된 데이터를 메모리에서 얼마나 유지할지 정한다.
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}