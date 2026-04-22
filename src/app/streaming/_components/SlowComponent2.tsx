async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function SlowComponent1() {
  await sleep(2000)

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h2 className="font-bold text-blue-800">컴포넌트 2</h2>
      <p className="text-blue-600">2초 후 로드됨</p>
    </div>
  )
}