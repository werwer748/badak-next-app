'use client'

import { useActionState } from 'react'
import { deletePost } from '@/app/actions/posts'
import { Button } from '@/components/ui/Button'

const initialState = {
  message: '',
  success: false,
}

export default function DeleteButton({ id }: { id: number }) {
  const [state, formAction, isPending] = useActionState(deletePost, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        {isPending ? '삭제 중...' : '삭제'}
      </Button>
      {state.message && !state.success && (
        <p className="text-red-600 text-sm mt-1">{state.message}</p>
      )}
    </form>
  )
}