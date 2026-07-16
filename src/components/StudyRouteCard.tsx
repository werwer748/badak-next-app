import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { categoryIcons } from '@/lib/category-icons'
import type { StudyRoute } from '@/data/study-routes'

const LINK_LABEL: Record<StudyRoute['linkType'], string> = {
  demo: '데모 보기',
  trigger: '체험하기',
  notion: '노션에서 보기 ↗',
}

export function StudyRouteCard({ route }: { route: StudyRoute }) {
  const Icon = categoryIcons[route.category]
  const isNotion = route.linkType === 'notion'
  // robots.txt / sitemap.xml은 페이지가 아니라 파일 응답이라 next/link 대신 일반 링크로 이동
  const isStaticFile = route.href.endsWith('.txt') || route.href.endsWith('.xml')

  const content = (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
      <div className="flex items-center justify-between">
        <Icon className="size-5 text-primary" />
        <Badge variant={isNotion ? 'outline' : 'default'}>
          {LINK_LABEL[route.linkType]}
        </Badge>
      </div>
      <h3 className="font-bold leading-snug">{route.title}</h3>
      <p className="text-sm text-muted-foreground">{route.description}</p>
    </div>
  )

  if (isNotion) {
    return (
      <a href={route.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    )
  }

  if (isStaticFile) {
    return (
      <a href={route.href} className="block h-full">
        {content}
      </a>
    )
  }

  return (
    <Link href={route.href} className="block h-full">
      {content}
    </Link>
  )
}
