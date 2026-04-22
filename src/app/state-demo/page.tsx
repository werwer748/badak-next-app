import { dehydrate, HydrationBoundary, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import PostList from "@/app/state-demo/_component/PostList";
import Modal from "@/app/state-demo/_component/Modal";

type TPost = {
  id: number
  title: string
  body: string
}

export default async function StateDemoPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<TPost[]>({
    queryKey: ['posts'],
    queryFn: () => (
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
    )
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-2">상태관리 데모</h1>
      <p className="text-gray-600 mb-6">
        Zustand + TanStack Query 조합이에요.
      </p>
      <Link href="/blog" className="text-blue-500 hover:underline mb-6 block">
        블로그로 이동 →
      </Link>
      <h2 className="text-xl font-bold mb-4">포스트 목록</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
      <Modal />
    </main>
  )
}