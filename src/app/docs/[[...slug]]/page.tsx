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
      <p className="text-gray-600 mb-2">
        slug 배열: {slug ? JSON.stringify(slug) : '없음 (루트)'}
      </p>
      <p className="text-gray-600 mb-2">
        현재 경로: /docs/{slug ? slug.join('/') : ''}
      </p>
      <p className="text-gray-600">
        depth: {slug ? slug.length : 0} 단계
      </p>
    </main>
  )
}