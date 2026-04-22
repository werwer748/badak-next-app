'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

const photos = [
  { id: '1', title: '첫 번째 사진', description: '아름다운 풍경' },
  { id: '2', title: '두 번째 사진', description: '도시의 야경' },
  { id: '3', title: '세 번째 사진', description: '바다의 일출' },
]

type Props = {
  params: Promise<{ id: string }>
}

export default function PhotoModal({ params }: Props) {
  const { id } = use(params)   // Promise를 동기처럼 풀어줘요
  const router = useRouter()
  const photo = photos.find((p) => p.id === id)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
          <span className="text-gray-500 text-xl">사진 {id}</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{photo?.title}</h2>
        <p className="text-gray-600 mb-4">{photo?.description}</p>
        <button
          onClick={() => router.back()}
          className="w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  )
}