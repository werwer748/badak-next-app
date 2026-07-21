/**
 * 가이드 랜딩 페이지 + 각 데모 페이지 상단 배너 + STUDY_PAGES.md가
 * 모두 이 배열 하나를 데이터 소스로 사용해요. 라우트를 추가/변경하면 여기만 고치면 됩니다.
 */

export type StudyCategory =
  | '기초 공사'
  | '라우팅 기초'
  | 'Route Group'
  | '동적 라우팅'
  | 'Parallel & Intercepting Routes'
  | 'Streaming'
  | 'Server Actions'
  | '상태관리'
  | '인증'
  | '에러 처리'
  | 'API Routes'
  | 'SEO'
  | '테스트'
  | '설정'

export type StudyLinkType =
  // 실제 페이지로 이동해서 눈으로 확인 가능
  | 'demo'
  // 데모이긴 한데 특정 상태(에러, 리다이렉트 등)를 일부러 트리거하는 링크
  | 'trigger'
  // 화면으로 보여줄 게 없어서(코드/설정/테스트) 노션 설명으로 연결
  | 'notion'

export interface StudyRoute {
  /** 카드/배너를 구분하는 고유 id */
  id: string
  title: string
  category: StudyCategory
  /** 학습 목적 (STUDY_PAGES.md의 "학습 목적"과 동일) */
  description: string
  /** 이 개념이 뭔지 한두 문장 설명 */
  whatIsIt: string
  /** 실무에서 주로 어디에 쓰이는지 */
  whereUsed: string
  /** 핵심 개념 bullet 목록 */
  concepts: string[]
  linkType: StudyLinkType
  /** demo/trigger는 내부 경로, notion은 노션 URL (지금은 placeholder) */
  href: string
}

export const studyRoutes: StudyRoute[] = [
  // ── 기초 공사 (화면 없음 → 노션) ───────────────
  {
    id: 'rendering-principles',
    title: '렌더링 원리 (CSR vs SSR)',
    category: '기초 공사',
    description: 'CSR/SSR 렌더링 원리와 FCP/TTI/LCP 지표 이해',
    whatIsIt:
      '브라우저가 HTML을 받아 화면을 그리기까지의 흐름(CSR)과, 그 과정에서 생기는 빈 화면·SEO 문제를 서버가 완성된 HTML을 내려주는 방식(SSR)으로 해결하는 원리를 다뤄요.',
    whereUsed:
      '렌더링 전략(SSR/SSG/ISR)을 선택하거나 성능을 논의할 때 기반이 되는 개념이에요.',
    concepts: [
      'CSR 흐름: HTML 뼈대 → bundle.js 다운로드 → React 실행 후 화면 표시',
      'FCP(First Contentful Paint) / TTI(Time to Interactive) / LCP(Largest Contentful Paint) 지표 차이',
      'SSR 등장 배경: 빈 화면(FCP) 문제 + SEO 크롤링 문제 해결',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/342dec40e00c800394e4f15cf64e59d0',
  },
  {
    id: 'hydration',
    title: 'Hydration',
    category: '기초 공사',
    description: 'SSR 이후 이벤트를 붙이는 Hydration 과정과 불일치 오류 원인',
    whatIsIt:
      "서버가 그려준 HTML은 그대로 두고 React가 그 위에 이벤트 리스너만 붙이는 과정이 Hydration이에요. 'use client' 선언 여부로 이벤트가 필요한 컴포넌트인지 구분하는 게 App Router의 핵심 설계예요.",
    whereUsed:
      '실무에서 Hydration 불일치는 반드시 잡아야 하는 버그라, Date.now()/Math.random(), window·localStorage 접근처럼 서버/클라이언트 결과가 달라지는 코드를 피할 때 참고해요.',
    concepts: [
      '서버 HTML과 클라이언트 계산 결과가 다르면 React가 처음부터 다시 그림 (Hydration 불일치)',
      '불일치 트리거 3가지: Date.now()/Math.random(), window·localStorage 접근, navigator.userAgent',
      '불일치 시 깜빡임(Flash) + FOUC(스타일이 순간 날아가는 현상) 발생',
      'SSG/ISR은 SSR의 "매 요청마다 새로 그리는" 부담을 줄이기 위한 Pre-rendering 전략',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/342dec40e00c804e8577e7a289cd799b',
  },
  {
    id: 'package-setup',
    title: 'package.json ~ 기본 패키지 설치',
    category: '기초 공사',
    description: 'create-next-app 없이 package.json/tsconfig/next.config를 직접 설정',
    whatIsIt:
      'pnpm init부터 next/react 설치, tsconfig.json의 strict·moduleResolution 옵션, next.config.ts의 reactStrictMode까지 Next.js 프로젝트의 기본 설정을 하나씩 손으로 구성해요.',
    whereUsed:
      'create-next-app이 대신 해주는 초기 세팅을 직접 이해하고 싶을 때, 기존 프로젝트에 Next.js를 새로 붙일 때 참고할 수 있어요.',
    concepts: [
      'private: true로 실수 배포 방지, pnpm-lock.yaml로 버전 고정',
      'tsconfig.json: strict, moduleResolution: bundler, paths로 @/* alias',
      'next.config.ts의 reactStrictMode — 이중 렌더링으로 Hydration 불일치를 미리 잡아줌',
      'Webpack → Turbopack(Rust, Next.js 16 기본 번들러)으로 전환',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/342dec40e00c809baf9fd7ea309250b1',
  },
  {
    id: 'folder-structure',
    title: '폴더 구조 만들기',
    category: '기초 공사',
    description: 'src/app 폴더 구조와 layout.tsx/page.tsx 역할 이해',
    whatIsIt:
      'layout.tsx는 모든 페이지를 감싸는 껍데기로 페이지 전환에도 다시 렌더링되지 않고, page.tsx는 폴더 경로가 곧 URL이 되는 라우트의 실제 화면이에요.',
    whereUsed:
      '모든 Next.js App Router 프로젝트의 최소 구조 — 새 라우트를 추가할 때마다 반복되는 패턴이에요.',
    concepts: [
      'layout.tsx: html/body 태그, 공통 헤더/네비게이션, 페이지 전환에도 리렌더링 안 됨 (Pages Router와의 차이)',
      'page.tsx: 폴더 구조가 곧 URL 구조',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/342dec40e00c8078b8e6e8438d7903dc',
  },
  {
    id: 'basic-screen-tailwind',
    title: '기본 화면 구성 + Tailwind 연결',
    category: '기초 공사',
    description: '첫 페이지 작성 + Tailwind CSS v4를 PostCSS로 연결',
    whatIsIt:
      'layout.tsx/page.tsx로 첫 화면을 띄운 뒤, tailwindcss + @tailwindcss/postcss + postcss 패키지와 postcss.config.ts, globals.css의 @import "tailwindcss" 한 줄로 Tailwind v4를 연결해요.',
    whereUsed: 'Next.js에 Tailwind CSS를 처음 붙이는 모든 프로젝트의 기본 세팅 흐름이에요.',
    concepts: [
      '@import "tailwindcss" 한 줄로 통합 (v3의 @tailwind base/components/utilities 3줄과 차이)',
      'postcss.config.ts가 루트에 있어야 Next.js가 빌드 시 자동으로 찾음',
      'globals.css 없으면 Tailwind 클래스가 전혀 적용 안 됨',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/343dec40e00c80149f00c7d21bd7e6f2',
  },

  // ── 라우팅 기초 ──────────────────────────────
  {
    id: 'counter',
    title: 'Counter (Client Component 기초)',
    category: '라우팅 기초',
    description: 'Client Component 기본 구조 + Hydration 불일치를 직접 만들고 고쳐본 경험',
    whatIsIt:
      "Server Component에 useState를 쓰면 바로 빌드 에러가 나요 — useState는 클라이언트에서만 쓸 수 있는 Hook이라, 상호작용이 필요한 부분만 'use client'로 분리해요. 'use client'는 'CSR로만 그려라'가 아니라 '초기 HTML은 서버에서 만들고, 그 위에서 Hydration한다'는 뜻이에요 (SSR + Hydration).",
    whereUsed:
      'Server Component를 최대한 유지하고 클라이언트가 꼭 필요한 부분만 분리하는 게 실무 원칙이에요 — 전체를 Client Component로 만들면 번들 사이즈가 커져서 FCP가 느려지고 SEO에도 불리해져요.',
    concepts: [
      "'use client' 없이 useState를 쓰면 빌드 에러: Server Component엔 상호작용 Hook 사용 불가",
      "렌더링 중 new Date()를 직접 쓰면 서버/클라이언트 시각이 달라 Hydration 불일치 에러 발생 → useState('')로 초기값 통일 + useEffect 안에서 시각 설정 + setInterval/clearInterval 정리로 해결한 패턴",
      '소스 보기에서 보이는 <!-- --> 주석은 Hydration이 텍스트 노드의 동적 값 경계를 인식하기 위한 표시',
      'Counter.test.tsx에서 렌더링/클릭 테스트',
    ],
    linkType: 'demo',
    href: '/counter',
  },

  // ── Route Group ──────────────────────────────
  {
    id: 'about',
    title: 'About (Route Group)',
    category: 'Route Group',
    description: '페이지마다 layout이 달라야 하는데 URL엔 안 드러나야 하는 문제를 Route Group으로 해결',
    whatIsIt:
      'app/layout.tsx 하나가 앱 전체를 감싸지만, 로그인/비로그인처럼 섹션마다 layout이 달라야 할 때가 있어요. 그렇다고 그 구분이 URL에 나타나면 안 되는데, `(폴더명)` 형태로 감싸면 URL 세그먼트에는 나타나지 않으면서 레이아웃만 따로 묶을 수 있어요.',
    whereUsed:
      '마케팅 페이지 그룹과 대시보드 페이지 그룹처럼, 같은 앱 안에서 헤더/사이드바 구성이 완전히 다른 섹션을 나눌 때 써요.',
    concepts: [
      'URL에 영향 없이 layout 분리 — (marketing)/about/page.tsx → /about, (dashboard)/dashboard/page.tsx → /dashboard',
      '(…) 아래 위치한 페이지들은 각각 자신 고유의 URL로 접근하면 해당 그룹 전용 layout으로 감싸짐',
      '(marketing) 그룹은 헤더만 있는 심플한 layout',
    ],
    linkType: 'demo',
    href: '/about',
  },

  // ── Parallel & Intercepting Routes ───────────
  {
    id: 'dashboard',
    title: 'Dashboard (Parallel Routes)',
    category: 'Parallel & Intercepting Routes',
    description: '@analytics는 loading.tsx, @orders는 수동 Suspense — 직접 비교해본 실험',
    whatIsIt:
      '`@slotName` 폴더로 같은 레이아웃 안에 여러 화면을 동시에, 서로 독립적으로 렌더링할 수 있어요. `layout.tsx`가 `children` + `analytics` + `orders`를 props로 함께 받아서 그리드로 배치해요.',
    whereUsed:
      '대시보드처럼 여러 위젯(분석, 주문 목록 등)이 서로 다른 속도로 로딩되는 화면에 주로 쓰여요.',
    concepts: [
      '(dashboard)/layout.tsx는 사이드바, (dashboard)/dashboard/layout.tsx는 @analytics/@orders 슬롯을 그리드로 배치',
      '실험 결과: @analytics는 폴더 안 loading.tsx만으로, @orders는 수동 <Suspense>로 감싸서 비교 — 둘 다 스켈레톤부터 화면 전환까지 동일하게 잘 동작함 (loading.tsx 컨벤션만으로 충분)',
      '@slotName 폴더 대신 일반 컴포넌트 + Suspense 조합도 가능하지만, 인터셉트 라우팅과 섞어 쓰거나 폴더 구조 자체로 라우팅을 다룰 때 더 높은 자유도를 줌 (다만 props 전달은 어려움)',
    ],
    linkType: 'demo',
    href: '/dashboard',
  },
  {
    id: 'photos',
    title: 'Photos (Parallel + Intercepting Routes)',
    category: 'Parallel & Intercepting Routes',
    description: '같은 URL, 다른 진입 경로 — 클릭은 모달, 새로고침은 전용 페이지',
    whatIsIt:
      '`(..)` 로 시작하는 Intercepting Route는 클라이언트 네비게이션(Link 클릭)일 땐 모달로 가로채서 보여주고, 직접 URL 입력·새로고침일 땐 인터셉트하지 않고 전용 페이지로 이동해요. 같은 URL인데 "어디서 접근했느냐"에 따라 다르게 렌더링되는 거예요.',
    whereUsed:
      'Instagram, Pinterest처럼 목록에서 클릭하면 모달로 뜨지만 새로고침하면 전용 페이지로 보이는 UX에 쓰여요.',
    concepts: [
      'photos/layout.tsx가 children + modal 슬롯을 함께 렌더링',
      'photos/@modal/(..)photos/[id]/page.tsx가 클릭 시 모달로 가로챔',
      'default.tsx는 {modal}/{children} 슬롯에 매칭되는 라우트가 없을 때 404를 방지하는 기본값 (아무것도 안 그림)',
      '인터셉트 (.)/(..)는 파일 시스템이 아니라 라우트 세그먼트 기준 — @modal은 세그먼트로 카운트되지 않아서, @modal 안에서 (..)가 한 단계 위인 photos를 가리킴',
      "새로고침 시엔 photos/[id]/page.tsx 전용 페이지로 이동. 모달은 'use client' + use() Hook으로 Promise params 처리(Server Component는 await, Client Component는 use()), next/navigation의 useRouter로 router.back() 닫기 처리",
    ],
    linkType: 'demo',
    href: '/photos',
  },

  // ── 동적 라우팅 ──────────────────────────────
  {
    id: 'blog-list',
    title: 'Blog 목록',
    category: '동적 라우팅',
    description: '정적 목록 페이지 + <a>와 <Link>의 실제 동작 차이',
    whatIsIt:
      '<a> 태그는 클릭하면 브라우저가 서버에 새로 GET 요청을 보내서 HTML을 처음부터 다시 받아요(전체 새로고침). <Link>는 서버에 다시 요청하지 않고 이미 받아온 JS 번들로 화면만 교체해요.',
    whereUsed: '앱 내부의 페이지 이동에는 기본적으로 <a> 대신 <Link>를 사용해요.',
    concepts: [
      '<Link> vs <a>: 새로고침 없이 화면만 교체',
      'Prefetching — 링크가 화면에 보이는 순간 해당 페이지 데이터를 미리 받아 옴',
    ],
    linkType: 'demo',
    href: '/blog',
  },
  {
    id: 'blog-slug',
    title: 'Blog 상세 ([slug])',
    category: '동적 라우팅',
    description: '동적 라우팅 [slug] + Server Component에서 async/await 바로 쓰기',
    whatIsIt:
      "폴더명을 대괄호로 감싸면(`[slug]`) 그 값이 런타임에 파라미터로 들어오는 동적 세그먼트가 돼요. Next.js 15부터 `params`가 Promise 타입이라 async/await로 받아야 해요. 이 페이지엔 'use client'가 없는 Server Component라, 컴포넌트 안에서 바로 async/await로 데이터를 받아 HTML을 완성해서 내려줄 수 있어요 (Client Component에서는 불가능).",
    whereUsed:
      '블로그 글, 상품 상세, 유저 프로필처럼 값이 여러 개인 상세 페이지에 필수적으로 쓰여요.',
    concepts: [
      'params.slug로 값 접근, params는 Promise라 async/await 필요',
      'Server Component는 컴포넌트에서 바로 async/await 가능 — 실제 서비스라면 이 자리에서 DB 조회',
      'generateMetadata 동적 메타데이터, Open Graph, JSON-LD',
      'notFound() 함수, error.tsx / not-found.tsx 에러 처리',
    ],
    linkType: 'demo',
    href: '/blog/hello-world',
  },
  {
    id: 'docs-catchall',
    title: 'Docs (Catch-all 라우팅)',
    category: '동적 라우팅',
    description: '[slug] → [...slug] → [[...slug]] 순서로 이해하는 catch-all 라우팅',
    whatIsIt:
      '`[slug]`는 세그먼트가 딱 하나일 때만 매칭돼요. `[...slug]`는 하나로 URL이 깊어지는 여러 세그먼트를 배열로 다 받을 수 있지만 slug가 최소 1개는 있어야 해요(`/docs`만 접근하면 404). `[[...slug]]`는 거기서 한 단계 더 나아가 slug가 아예 없어도(`/docs`) 매칭돼요.',
    whereUsed:
      '문서 사이트처럼 깊이가 가변적인 트리 구조 콘텐츠에 적합해요.',
    concepts: [
      '[slug]: 세그먼트 1개만 매칭',
      "[...slug]: 여러 세그먼트를 배열로 받지만 최소 1개 필요, 없으면 404",
      "[[...slug]]: slug 없어도 매칭 (/docs → undefined), 있으면 배열 (/docs/a/b/c → ['a','b','c'])",
      '파일 하나로 /docs부터 /docs/a/b/c까지 전부 처리',
    ],
    linkType: 'demo',
    href: '/docs',
  },

  // ── Streaming ────────────────────────────────
  {
    id: 'streaming',
    title: 'Streaming SSR',
    category: 'Streaming',
    description: 'SSR도 못 푸는 문제(느린 API 순차 대기)를 Suspense로 해결',
    whatIsIt:
      'CSR은 JS를 다 받을 때까지, SSR은 HTML이 완성될 때까지 흰 화면이에요 — API가 1초·2초·3초씩 걸리는 3개를 순차로 기다리면 6초간 흰 화면이 뜨는 식이죠. Streaming SSR은 준비된 부분(레이아웃, 헤더 등)은 즉시 보내고, 조회가 끝난 부분만 나눠서 순서대로 채워 넣어요. 이 "준비 중 → 채우기"를 담당하는 게 <Suspense fallback>이에요.',
    whereUsed:
      '느린 API를 호출하는 대시보드나 커머스 상세 페이지에서 스켈레톤 UI와 함께 자주 사용돼요.',
    concepts: [
      '컴포넌트별 독립 로딩, 스켈레톤 UI — 먼저 끝난 컴포넌트부터 순서 상관없이 표시',
      '각 컴포넌트가 필요한 데이터를 스스로 fetch — 부모에서 props로 내려줄 필요가 없어 props drilling도, 별도 상태관리 라이브러리도 필요 없음',
      'FCP 개선',
      '소스 보기에서 <!--$?--> / $RC 확인',
    ],
    linkType: 'demo',
    href: '/streaming',
  },

  // ── Server Actions ───────────────────────────
  {
    id: 'server-actions-demo',
    title: 'Server Actions 데모',
    category: 'Server Actions',
    description: 'Route Handler 대신 Server Actions로 왕복 횟수 줄이기',
    whatIsIt:
      'HTTP 엔드포인트 없이 서버 함수를 함수 호출처럼 바로 쓸 수 있어요. Route Handler로 mutation을 처리하면 POST 후 목록을 다시 GET하는 왕복이 2번 생기는데, Server Actions는 revalidatePath로 서버가 갱신된 UI까지 한 응답에 실어서 내려주기 때문에 왕복이 1번으로 줄어요 — 요청 자체가 없어지는 게 아니라 왕복 횟수가 줄어드는 것.',
    whereUsed:
      '글쓰기, 좋아요, 댓글처럼 폼 제출 기반 mutation에 API 라우트 대신 자주 사용돼요. 모바일 앱, 웹훅처럼 진짜 외부 HTTP API가 필요할 땐 여전히 Route Handler를 써요.',
    concepts: [
      "'use server' 선언 위치: 파일 전체(재사용 목적, 실무에서 가장 흔한 패턴) vs 함수 하나만 — Client Component 안에서는 인라인 선언 자체가 에러",
      'useActionState(action, initialState) — prevState가 첫 번째 인자, FormData가 두 번째 인자로 자동 전달',
      '예상 가능한 에러는 throw 대신 return — useActionState가 그 반환값을 state로 받아 UI에 표시',
      'revalidatePath로 서버에서 페이지를 다시 렌더링 → 응답에 데이터 + 갱신된 RSC 페이로드까지 포함되어 왕복 1번으로 끝남',
    ],
    linkType: 'demo',
    href: '/server-actions-demo',
  },

  // ── 상태관리 ─────────────────────────────────
  {
    id: 'state-demo',
    title: '상태관리 데모 (Zustand + TanStack Query)',
    category: '상태관리',
    description: 'Zustand + TanStack Query 조합 실습',
    whatIsIt:
      'Zustand는 컴포넌트 밖에 상태를 둬서 props 없이 여러 컴포넌트가 같은 상태를 제어하게 해주는 클라이언트 전역 상태고, TanStack Query는 서버 데이터를 가져오고 캐싱하는 라이브러리예요. QueryClientProvider는 Client Component라 Server Component인 layout에 바로 못 넣는데, "Client Component가 children으로 Server Component 결과물을 받는 건 가능"하다는 점을 이용해 QueryProvider를 별도 파일로 분리해요.',
    whereUsed:
      '실무에서 흔한 조합으로, 모달/탭 같은 UI 상태는 Zustand, 서버에서 가져온 데이터는 TanStack Query로 관리해요.',
    concepts: [
      'Zustand useModalStore로 모달 전역 상태 관리',
      'persist 미들웨어(createJSONStorage + partialize) 실험 후 현재는 주석 처리',
      'QueryClient를 useState(() => new QueryClient())로 감싸는 이유: 요청마다 새 인스턴스를 만들어 유저 간 캐시(데이터) 오염 방지',
      'isLoading(캐시 없이 최초 fetch일 때만 true) vs isFetching(백그라운드 refetch 포함 전부 true) 차이',
      'Dehydration/Hydration: 서버에서 prefetchQuery + dehydrate로 데이터를 HTML에 실어 보내면, 클라이언트는 HydrationBoundary로 캐시에 복원 — PostList엔 isLoading 자체가 필요 없어짐',
      'Optimistic Update: onMutate에서 캐시 백업 + 즉시 UI 반영 → 실패 시 onError에서 백업으로 롤백, 성공 시 onSuccess에서 invalidateQueries로 실제 데이터 교체',
    ],
    linkType: 'demo',
    href: '/state-demo',
  },

  // ── 인증 ─────────────────────────────────────
  {
    id: 'login',
    title: '로그인 페이지',
    category: '인증',
    description: 'proxy.ts 인증 체크 테스트용',
    whatIsIt:
      "Next.js 16에서 middleware.ts 파일 컨벤션이 deprecated되고 proxy.ts로 이름이 바뀌었어요. proxy.ts는 요청이 page.tsx에 도달하기 전에 가장 먼저 실행되는데, 보호된 경로 접근 시 인증 여부를 검사하고 토큰이 없으면 이 페이지로 리다이렉트해요.",
    whereUsed: '실무의 인증 가드, 로그인 리다이렉트 플로우와 동일한 패턴이에요.',
    concepts: ['토큰 없이 /dashboard 접근 시 리다이렉트 목적지'],
    linkType: 'demo',
    href: '/login',
  },
  {
    id: 'auth-guard-trigger',
    title: '인증 가드 체험하기',
    category: '인증',
    description: '쿠키 없이 보호된 경로에 접근했을 때의 리다이렉트 동작 확인',
    whatIsIt:
      'proxy.ts의 matcher에 걸리는 요청마다 로깅 → 인증 체크 → 보안 헤더 추가 순서로 실행돼요. /dashboard는 auth-token 쿠키가 없으면 /login으로 리다이렉트돼요. proxy는 Edge Runtime에서 도는 가벼운 코드라 DB 조회나 무거운 라이브러리는 여기서 못 쓰고, 라우팅/리다이렉트/헤더 같은 가벼운 처리만 담당해요.',
    whereUsed: 'Next.js proxy(구 middleware)로 구현하는 인증 가드의 전형적인 예시예요.',
    concepts: [
      '쿠키 없으면 /login 리다이렉트',
      "matcher의 부정 전방탐색 정규식 — '_next/static·_next/image·favicon.ico·public로 시작하지 않는 경로만' proxy 실행 (정적 파일 제외로 불필요한 실행 방지)",
      'Link로 이동하면 클라이언트 사이드 네비게이션이라 서버에 요청이 안 가서 proxy가 실행되지 않음 — proxy는 URL 직접 접근/새로고침/API 요청만 처리, layout.tsx는 Link 이동 포함 모든 경우를 처리',
    ],
    linkType: 'trigger',
    href: '/dashboard',
  },

  // ── 에러 처리 ────────────────────────────────
  {
    id: 'error-boundary-trigger',
    title: '에러 페이지 (error.tsx) 트리거',
    category: '에러 처리',
    description: '블로그 상세에서 런타임 에러를 의도적으로 발생시켜 error.tsx 확인',
    whatIsIt:
      "라우트 트리의 특정 구간에서 발생한 런타임 에러를 그 구간만 감싸서 처리하는 파일 컨벤션(Error Boundary)이에요. error.tsx는 반드시 'use client'여야 해요 — 에러 바운더리는 클라이언트에서 동작하거든요. 에러가 나면 가장 가까운 error.tsx부터 찾고, 없으면 상위로 버블링돼서 app/error.tsx, 그마저 없으면 global-error.tsx까지 올라가요.",
    whereUsed:
      '결제, 데이터 조회처럼 실패할 수 있는 기능 근처에 배치해서 앱 전체가 죽지 않도록 막아줘요.',
    concepts: [
      "error.tsx는 반드시 Client Component ('use client' 필수)",
      'error 객체: 개발 환경엔 실제 에러 메시지, 프로덕션에선 민감 정보 제거된 일반 메시지만 노출. digest는 서버 에러를 서버 로그와 매칭하는 해시값',
      'reset()으로 에러 바운더리를 초기화하고 재렌더링 시도',
      'global-error.tsx는 루트 layout을 완전히 대체하므로 html·body 태그를 직접 포함해야 함 (error.tsx와의 결정적 차이)',
    ],
    linkType: 'trigger',
    href: '/blog/hello-world?error=true',
  },
  {
    id: 'not-found-trigger',
    title: '404 페이지 (not-found.tsx) 트리거',
    category: '에러 처리',
    description: '존재하지 않는 블로그 slug로 접근해 not-found.tsx 확인',
    whatIsIt:
      "notFound() 호출 시 가장 가까운 not-found.tsx를 렌더링하는 파일 컨벤션이에요. error.tsx와 달리 not-found.tsx는 'use client'가 필요 없는 Server Component고, props도 없어요 — 그냥 UI만 보여주면 돼요.",
    whereUsed:
      '존재하지 않는 게시글/상품 등 리소스 조회 실패를 사용자에게 자연스럽게 보여줄 때 써요.',
    concepts: [
      'notFound() 함수 호출로 트리거 (자동으로 뜨는 게 아니라 코드에서 명시적으로 호출해야 함)',
      '가장 가까운 not-found.tsx가 먼저 적용 — /blog/[slug]/not-found.tsx가 있으면 그게 먼저 잡고, 없으면 상위 app/not-found.tsx로 버블링',
    ],
    linkType: 'trigger',
    href: '/blog/this-slug-does-not-exist',
  },

  // ── API Routes (화면 없음 → 노션) ─────────────
  {
    id: 'api-posts',
    title: 'Route Handler (GET/POST /api/posts)',
    category: 'API Routes',
    description: 'Route Handler 기본 구조',
    whatIsIt:
      "app 디렉토리 안이면 어디든 route.ts 파일 하나로 REST 스타일 API 엔드포인트를 만들 수 있어요 (api 폴더는 관례일 뿐 필수는 아니고, page.tsx와 route.ts는 같은 폴더에 공존 못 해요). Route Handlers는 외부와 소통하는 HTTP API, Server Actions는 컴포넌트에서 직접 호출하는 서버 함수 — 역할이 달라요.",
    whereUsed: '외부에 노출할 API, 웹훅 수신, 클라이언트가 호출할 커스텀 엔드포인트에 써요.',
    concepts: [
      'GET / POST 핸들러 분리',
      'Response.json() — 웹 표준 Response API (Pages Router의 res.json()과 다름)',
      'request.nextUrl.searchParams로 쿼리 파라미터 접근',
      '유효성 검사, HTTP 상태 코드',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/351dec40e00c8028b1c0eba62a74e937',
  },
  {
    id: 'api-posts-id',
    title: '동적 Route Handler (/api/posts/[id])',
    category: 'API Routes',
    description: '동적 Route Handler',
    whatIsIt:
      'Route Handler에도 [id] 같은 동적 세그먼트를 붙일 수 있어요. params가 두 번째 인자로 들어오고 Next.js 15부터 Promise 타입이라 await로 받아요 — page.tsx에서 params 받는 방식과 동일해요.',
    whereUsed: '특정 리소스 하나를 조회/수정/삭제하는 REST 엔드포인트(GET/PUT/DELETE)에 써요.',
    concepts: [
      'params 두 번째 인자 (Promise 타입, await 필요)',
      'findIndex / splice로 수정·삭제, 404 처리',
      'POST/PUT/DELETE 핸들러가 같은 파일에 있으면 Next.js가 자동으로 캐시를 비활성화 (mutation 있는 라우트는 캐시하면 위험)',
      "dynamic/revalidate로 Route Segment Config 설정 가능 — GET 전용 + 자주 안 바뀌는 데이터에 적합, 'use client' 파일에서는 사용 불가",
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/351dec40e00c8028b1c0eba62a74e937',
  },
  {
    id: 'api-webhook',
    title: 'Webhook + revalidateTag',
    category: 'API Routes',
    description: '웹훅 + revalidateTag 개념 이해',
    whatIsIt:
      '외부 서비스(결제 등)가 이벤트 발생 시 우리 서버로 호출해주는 콜백 엔드포인트예요. 캐시 무효화 전략은 두 가지 — TTL(revalidate: 초 단위로 일정 시간 지나면 자동 무효화)과 On-demand Invalidation(데이터가 바뀌는 순간 즉시 무효화). 웹훅은 후자를 쓰는 대표 사례예요.',
    whereUsed: '결제 완료 알림, CMS 콘텐츠 변경 알림 같은 외부 이벤트 수신에 써요.',
    concepts: [
      '외부 서비스 웹훅 수신',
      "revalidatePath('/orders')는 그 경로에서 쓰는 모든 fetch 캐시를 날림(범위 넓음), revalidateTag('orders')는 그 태그가 붙은 fetch만 정밀하게 무효화",
      'TanStack Query와의 매핑: staleTime ↔ revalidate(TTL), invalidateQueries ↔ revalidatePath·revalidateTag',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/351dec40e00c8028b1c0eba62a74e937',
  },

  // ── SEO (실제로 서빙되는 경로라 데모 가능) ─────
  {
    id: 'robots',
    title: 'robots.ts',
    category: 'SEO',
    description: 'MetadataRoute.Robots로 robots.txt 동적 생성',
    whatIsIt:
      '검색엔진 크롤러에게 어떤 경로를 긁어가도 되는지 알려주는 robots.txt를 코드로 생성해요. 구글이 사이트마다 할당하는 크롤링 리소스(크롤 버짓)는 한정돼 있어서, 불필요한 페이지를 열어두면 정작 중요한 페이지 크롤링이 밀려요.',
    whereUsed: '크롤러별로 접근 허용 범위를 다르게 주고 싶을 때(AI 봇 차단 등) 씁니다.',
    concepts: [
      "UA별 규칙 분기 (* 는 /dashboard, /api/, /_next/ disallow, GPTBot은 전체 disallow)",
      'sitemap 필드로 sitemap.xml 위치 명시',
      'robots.txt는 신사협정일 뿐 보안 수단이 아님 — 막고 싶은 경로를 여기 적으면 오히려 위치를 알려주는 셈이라, 실제 보안은 미들웨어 등으로 별도 처리해야 함',
    ],
    linkType: 'demo',
    href: '/robots.txt',
  },
  {
    id: 'sitemap',
    title: 'sitemap.ts',
    category: 'SEO',
    description: 'MetadataRoute.Sitemap으로 sitemap.xml 동적 생성',
    whatIsIt: '검색엔진에 우리 사이트의 전체 URL 목록과 우선순위를 알려주는 sitemap.xml을 코드로 생성해요.',
    whereUsed: 'SEO가 중요한 서비스에서 신규/변경된 페이지를 검색엔진이 빠르게 인덱싱하도록 도와요.',
    concepts: [
      '정적 URL + posts.map()으로 동적 URL 생성 (실무에서는 DB에서 slug 조회해 매핑)',
      'changeFrequency / priority 설정',
      '구글은 sitemap 파일 하나당 URL 5만 개까지만 허용 — 초과하면 Sitemap Index로 여러 개 분리하거나 페이지네이션 방식 사용',
      '실무에서는 SEO가 필요 없는 페이지까지 다 넣지 않음 — 크롤 버짓(Crawl Budget) 낭비 방지',
    ],
    linkType: 'demo',
    href: '/sitemap.xml',
  },

  // ── 테스트 (화면 없음 → 노션) ──────────────────
  {
    id: 'testing',
    title: 'Jest + Testing Library',
    category: '테스트',
    description: 'Next.js 프로젝트에 Jest 붙이기',
    whatIsIt:
      "Jest는 테스트 실행 엔진(\"테스트를 어떻게 실행하나\"), React Testing Library는 컴포넌트를 렌더링하고 DOM을 조작하는 도구(\"컴포넌트를 어떻게 테스트하나\")예요 — 역할이 서로 달라요. 테스트 코드는 회귀 방지, 리팩토링 안정망, \"이 컴포넌트가 어떻게 동작해야 하는지\"를 보여주는 문서 역할까지 겸해요.",
    whereUsed: '리팩터링이나 배포 전에 회귀 버그를 잡기 위해 실무에서 필수적으로 사용해요.',
    concepts: [
      "next/jest.js의 nextJest() 헬퍼, testEnvironment: 'jsdom'",
      "moduleNameMapper로 @/ alias 매핑",
      'renderHook + act로 컴포넌트 없이 Zustand 훅만 단독 테스트, beforeEach로 전역 스토어 상태 초기화',
      'jest.mock으로 모듈 전체를 가짜로 교체 + jest.mocked()로 TypeScript 타입 지원 (PostList 테스트에서 useModalStore 모킹)',
      'Testing Library 철학: 유저가 실제로 보고 상호작용하는 결과를 테스트 — getByRole/getByText로 접근성 기반 조회',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/34bdec40e00c808490efe501c32b847e',
  },

  // ── 설정 (화면 없음 → 노션) ────────────────────
  {
    id: 'config-and-proxy',
    title: '공통 설정 & proxy.ts 인터셉터',
    category: '설정',
    description: 'reactStrictMode, jest 설정 등 공통 설정 파일 + 미들웨어 상세',
    whatIsIt:
      'next.config.ts의 reactStrictMode: true는 컴포넌트를 서버 1번 + 클라이언트 1번 이중 렌더링해서 결과가 다르면 바로 잡아줘요 (Hydration 문제 조기 발견). proxy.ts(Next.js 16에서 middleware.ts를 대체)는 요청이 page.tsx/route.ts에 도달하기 전, 매 요청마다 가장 먼저 실행돼요.',
    whereUsed:
      '모든 Next.js 프로젝트의 기본 설정이자, 인증 체크·리다이렉트·보안 헤더·A/B 테스트·국제화(언어 감지 후 /ko, /en 분기)처럼 요청 단위 공통 처리가 필요할 때 proxy를 씁니다.',
    concepts: [
      'next.config.ts의 reactStrictMode: true — 이중 렌더링으로 Hydration 불일치를 미리 잡아줌',
      'proxy가 할 수 있는 일: 인증 체크, 리다이렉트, 헤더 추가, A/B 테스트, 국제화 분기',
      'proxy가 할 수 없는 일: DB 조회, 무거운 라이브러리, 복잡한 비즈니스 로직 (Edge Runtime 제약)',
      'matcher로 정적 파일(_next/static, _next/image, favicon.ico, public) 제외해서 불필요한 실행 방지',
    ],
    linkType: 'notion',
    href: 'https://app.notion.com/p/35adec40e00c80b1b4d7ea71b7c0d52f',
  },
]