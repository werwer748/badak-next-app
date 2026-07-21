import { studyRoutes } from '@/data/study-routes'
import { categoryIcons } from '@/lib/category-icons'

export function StudyNote({ id }: { id: string }) {
  const route = studyRoutes.find((r) => r.id === id)

  if (!route) {
    throw new Error(`StudyNote: study-routes.ts에 id "${id}"가 없어요`)
  }

  const Icon = categoryIcons[route.category]

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <span className="text-sm font-bold text-muted-foreground">{route.category}</span>
      </div>
      <p className="text-sm leading-relaxed">{route.whatIsIt}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{route.whereUsed}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {route.concepts.map((concept) => (
          <li key={concept}>{concept}</li>
        ))}
      </ul>
    </div>
  )
}
