'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type NewPost = {
  title: string
  body: string
}

type Post = {
  id: number
  title: string
  body: string
}

type MutationContext = {
  previousPosts: Post[] | undefined
}

async function createPost(newPost: NewPost): Promise<Post> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) throw new Error('포스트 작성 실패')

  return res.json()
}

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<Post, Error, NewPost, MutationContext>({
    mutationFn: createPost,

    // mutate 실행되는 순간 가장 먼저 실행
    onMutate: async (newPost): Promise<MutationContext> => {
      // 1. 진행 중인 refetch 취소 (충돌 방지)
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // 2. 현재 캐시 백업 (롤백용) - getQueryData/getQueriesData 구분!
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // 3. 즉시 임시 포스트 추가 - setQueryData/setQueriesData 구분!
      queryClient.setQueryData<Post[]>(['posts'], (old) => [
        {
          id: Date.now(), // 임시 ID
          title: newPost.title,
          body: newPost.body,
        },
        ...(old ?? [])
      ]);

      return { previousPosts };
    },
    onError: (error, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
      console.error('포스트 작성 중 오류 발생: ', error);
    },
    onSuccess: (data) => {
      console.log('생성된 포스트: ', data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
      setBody('');
    },
  });

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="font-bold mb-4">새 포스트 작성</h2>
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="내용"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => mutate({ title, body })}
          disabled={isPending || !title || !body}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '작성 중...' : '작성하기'}
        </button>
        {isError && (
          <p className="text-red-600 text-sm">작성에 실패했어요.</p>
        )}
      </div>
    </div>
  )
}