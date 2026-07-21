import { Suspense } from 'react'
import SlowComponent1 from './_components/SlowComponent1'
import SlowComponent2 from './_components/SlowComponent2'
import SlowComponent3 from './_components/SlowComponent3'
import { StudyNote } from '@/components/StudyNote'

function LoadingSkeleton() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}

export default function StreamingPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Streaming 테스트</h1>
      <StudyNote id="streaming" />
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent1 />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent2 />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent3 />
      </Suspense>
    </main>
  )
}