async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function AnalyticsPage() {
  await sleep(2000)

  return (
    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
      <h2 className="font-bold text-purple-800 mb-2">매출 차트</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-purple-600">1월</span>
          <span className="font-bold text-purple-800">₩1,200,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-purple-600">2월</span>
          <span className="font-bold text-purple-800">₩980,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-purple-600">3월</span>
          <span className="font-bold text-purple-800">₩1,540,000</span>
        </div>
      </div>
    </div>
  )
}