'use client'

import { useModalStore } from '@/store/useModalStore'

export default function Modal() {
  const { isOpen, title, content, close } = useModalStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <button
          onClick={close}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  )
}