type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{slug} 포스트</h1>
      <p className="text-gray-600">slug 값: {slug}</p>
      <a href="/blog" className="text-blue-500 hover:underline mt-4 block">
        ← 목록으로
      </a>
    </main>
  )
}