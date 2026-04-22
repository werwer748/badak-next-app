import type { MetadataRoute } from 'next'

const posts = [
  { slug: 'hello-world', updatedAt: '2024-01-01' },
  { slug: 'next-js-study', updatedAt: '2024-01-02' },
  { slug: 'hydration-deep-dive', updatedAt: '2024-01-03' },
]

/*
=> 실무에서는 이런식으로 DB에서 모든 포스트 slug를 가져와서 동적으로 URL을 생성한다!!
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // DB에서 모든 포스트 slug를 가져와서 동적으로 URL 생성
    const posts = await db.post.findMany()

    return [
      { url: 'https://myapp.com' },
      ...posts.map(post => ({
        url: `https://myapp.com/blog/${post.slug}`
      }))
    ]
  }
*/

export default function sitemap(): MetadataRoute.Sitemap {
  const postUrls = posts.map((post) => ({
    url: `https://badak.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://badak.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://badak.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ]
}