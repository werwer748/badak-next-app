import { studyRoutes, type StudyCategory } from '@/data/study-routes'
import { StudyRouteCard } from '@/components/StudyRouteCard'

const CATEGORY_ORDER: StudyCategory[] = [
  '기초 공사',
  '라우팅 기초',
  'Route Group',
  '동적 라우팅',
  'Parallel & Intercepting Routes',
  'Streaming',
  'Server Actions',
  '상태관리',
  '인증',
  '에러 처리',
  'API Routes',
  'SEO',
  '테스트',
  '설정',
]

function toSlug(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function HomePage() {
  const categories = CATEGORY_ORDER.filter((category) =>
    studyRoutes.some((route) => route.category === category)
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Next.js 기능 학습 아카이브</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          <code>create-next-app</code> 없이 직접 구성한 Next.js 16 프로젝트예요. 카드마다
          어떤 라우트가 어떤 개념을 학습하기 위해 만들어졌는지 보여주고, 화면으로 보여주기
          애매한 것들(테스트, API, 설정)은 노션 정리 페이지로 연결돼요.
        </p>
        <nav className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${toSlug(category)}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {category}
            </a>
          ))}
        </nav>
      </section>

      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category} id={toSlug(category)} className="scroll-mt-8">
            <h2 className="mb-4 text-xl font-bold">{category}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {studyRoutes
                .filter((route) => route.category === category)
                .map((route) => (
                  <StudyRouteCard key={route.id} route={route} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
