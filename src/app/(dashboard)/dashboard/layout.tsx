import { Suspense } from 'react'

function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export default function DashboardLayout({
    children,
    analytics,
    orders,
  }: {
    children: React.ReactNode
    analytics: React.ReactNode
    orders: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/*<Suspense fallback={<LoadingSkeleton label="매출 차트" />}>*/}
          {analytics}
        {/*</Suspense>*/}
        <Suspense fallback={<LoadingSkeleton label="최근 주문" />}>
          {orders}
        </Suspense>
      </div>
    </div>
  )
}