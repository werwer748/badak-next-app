import type { Metadata } from 'next';
import Link from 'next/link';
import { StudyNote } from '@/components/StudyNote'

export const metadata: Metadata = {
  title: '블로그',
  description: 'Next.js로 만든 블로그 페이지입니다.',
}

const posts = [
  { slug: 'hello-world', title: '첫 번째 포스트' },
  { slug: 'next-js-study', title: 'Next.js 공부 시작' },
  { slug: 'hydration-deep-dive', title: 'Hydration 완전 정복' },
]

export default function BlogPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      <StudyNote id="blog-list" />
      <Link href="/state-demo" className="text-blue-500 hover:underline mb-6 block">
        ← 상태관리 데모로 돌아가기
      </Link>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline text-lg"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}