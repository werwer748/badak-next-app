async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function OrdersPage() {
  await sleep(1000)

  return (
    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
      <h2 className="font-bold text-teal-800 mb-2">최근 주문</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="text-teal-600">주문 #1042</span>
          <span className="font-bold text-teal-800">₩45,000</span>
        </li>
        <li className="flex justify-between">
          <span className="text-teal-600">주문 #1041</span>
          <span className="font-bold text-teal-800">₩128,000</span>
        </li>
        <li className="flex justify-between">
          <span className="text-teal-600">주문 #1040</span>
          <span className="font-bold text-teal-800">₩67,000</span>
        </li>
      </ul>
    </div>
  )
}