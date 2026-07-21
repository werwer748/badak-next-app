import { StudyNote } from '@/components/StudyNote'

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="mb-6 text-muted-foreground">마케팅 layout이 적용된 페이지예요.</p>
      <StudyNote id="about" />
    </div>
  )
}