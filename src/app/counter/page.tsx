import Counter from './_components/Counter'
import { StudyNote } from '@/components/StudyNote'

export default function CounterPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-primary">Counter</h1>
      <p className="mt-4 mb-6 text-muted-foreground">
        Client Component 기본기 (useState, useEffect)를 확인하는 페이지예요.
      </p>
      <StudyNote id="counter" />
      <Counter />
    </main>
  )
}