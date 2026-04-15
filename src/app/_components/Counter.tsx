'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toLocaleTimeString())

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        클릭 횟수: {count}
      </button>
      <p className="mt-2 text-gray-600">
        현재 시각: {time || '시각 불러오는 중...'}
      </p>
    </div>
  )
}