import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const posts = [
  { slug: 'hello-world', title: '첫 번째 포스트', description: '안녕하세요!' },
  { slug: 'next-js-study', title: 'Next.js 공부 시작', description: 'Next.js를 공부합니다.' },
  { slug: 'hydration-deep-dive', title: 'Hydration 완전 정복', description: 'Hydration을 파헤칩니다.' },
];

type Props = {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ error?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없어요',
    };
  }
  
  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      type: "article",
      url: `https://badak.com/blog/${slug}`,
      images: [
        {
          url: 'https://myapp.com/og-image.png',  // 실제로는 동적 이미지
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
    // twitter, facebook 등 다른 메타 태그도 여기에 추가할 수 있다!!
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.description,
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { error } = await searchParams;
  const post = posts.find((p) => p.slug === slug);
  
  // 포스트가 없으면 not-found.tsx 렌더링
  if (!post) {
    notFound();
  }
  
  // 에러 시뮬레이션 → /blog/hello-world?error=true 로 접근하면 에러 발생
  // 실제로는 DB 조회 실패 같은 상황
  if (error) throw new Error('포스트 로딩 실패!');
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.title,
    description: post?.description,
    url: `https://badak.com/blog/${slug}`,
    datePublished: '2026-04-22',
    author: {
      "@type": "Person",
      name: "홍길동",
    },
  };
  
  return (
    <main className="p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-gray-600">{post?.description}</p>
      <a href="/blog" className="text-blue-500 hover:underline mt-4 block">
        ← 목록으로
      </a>
    </main>
  );
}