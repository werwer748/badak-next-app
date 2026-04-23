import { dehydrate, HydrationBoundary, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import PostList from "@/app/state-demo/_component/PostList";
import Modal from "@/app/state-demo/_component/Modal";
import PostForm   from "@/app/state-demo/_component/PostForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
      <Badge variant="success">신선한 데이터</Badge>
      <Badge variant="warning">업데이트 중</Badge>
      <Badge variant="danger">에러</Badge>
      <Badge variant="outline">기본</Badge>

      <Button variant="default">블로그로 이동</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="destructive">삭제</Button>
      <h2 className="text-xl font-bold mb-4">포스트 목록</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostForm />
        <PostList />
      </HydrationBoundary>
      <Modal />
    </main>
  )
}