'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions/posts'
import { Button } from '@/components/ui/Button'

const initialState = {
  message: '',
  success: false,
}

export default function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState)

  return (
    <form action={formAction} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="font-bold text-lg">새 포스트 작성</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="제목을 입력해요"
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium mb-1">
          내용
        </label>
        <textarea
          id="body"
          name="body"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="내용을 입력해요"
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? '작성 중...' : '작성하기'}
      </Button>
      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  )
}