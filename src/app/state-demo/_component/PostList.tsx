'use client'

import { useQuery } from '@tanstack/react-query'
import { useModalStore } from '@/store/useModalStore'
import { Badge } from "@/components/ui/Badge";

type Post = {
  id: number
  title: string
  body: string
}

export default function PostList() {
  const { open } = useModalStore()

  const { data, isFetching } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then((res) => res.json()),
    staleTime: 1000 * 60,
  })

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">
          {isFetching
            ? <Badge variant="warning">업데이트 중</Badge>
            : <Badge variant="success">최신 데이터</Badge>
          }
        </span>
      </div>
      <ul className="space-y-3">
        {data?.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={() => open(post.title, post.body)}
          >
            <h3 className="font-bold text-sm mb-1">{post.title}</h3>
            <p className="text-gray-600 text-sm truncate">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}