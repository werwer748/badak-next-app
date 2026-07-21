import { StudyNote } from '@/components/StudyNote'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Docs 페이지</h1>
      <StudyNote id="docs-catchall" />
      <div className="space-y-2 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p>slug 배열: {slug ? JSON.stringify(slug) : '없음 (루트)'}</p>
        <p>현재 경로: /docs/{slug ? slug.join('/') : ''}</p>
        <p>depth: {slug ? slug.length : 0} 단계</p>
      </div>
    </main>
  )
}