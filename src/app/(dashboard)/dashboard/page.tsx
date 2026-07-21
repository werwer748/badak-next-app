import { StudyNote } from '@/components/StudyNote'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">대시보드</h1>
      <p className="mb-6 text-gray-600">사이드바 layout이 적용된 페이지예요.</p>
      <StudyNote id="dashboard" />
    </div>
  )
}