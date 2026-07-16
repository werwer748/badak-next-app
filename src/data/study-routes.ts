/**
 * 가이드 랜딩 페이지 + 각 데모 페이지 상단 배너 + STUDY_PAGES.md가
 * 모두 이 배열 하나를 데이터 소스로 사용해요. 라우트를 추가/변경하면 여기만 고치면 됩니다.
 */

export type StudyCategory =
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
  // ── 라우팅 기초 ──────────────────────────────
  {
    id: 'counter',
    title: 'Counter (Client Component 기초)',
    category: '라우팅 기초',
    description: 'Client Component 기본 구조(useState, useEffect) + 테스트 대상',
    whatIsIt:
      "'use client' 로 선언하면 브라우저에서 상태·이벤트·타이머 같은 상호작용이 가능한 컴포넌트가 돼요. 아무 선언이 없으면 기본값은 Server Component예요.",
    whereUsed:
      '버튼 클릭, 폼 입력, 실시간 시계처럼 사용자 상호작용이나 브라우저 API가 필요한 모든 UI에 쓰여요.',
    concepts: [
      "'use client' 선언",
      'setInterval로 매초 갱신되는 시각 표시',
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
    description: 'Route Group `(폴더)` 패턴 이해',
    whatIsIt:
      '`(name)` 형태 폴더는 URL 세그먼트에 나타나지 않으면서 레이아웃만 그룹으로 묶을 수 있게 해줘요.',
    whereUsed:
      '마케팅 페이지 그룹과 대시보드 페이지 그룹처럼, 같은 앱 안에서 헤더/사이드바 구성이 완전히 다른 섹션을 나눌 때 써요.',
    concepts: [
      'URL에 영향 없이 layout 분리',
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
    description: 'Route Group + Parallel Routes 조합',
    whatIsIt:
      '`@slotName` 폴더로 같은 레이아웃 안에 여러 화면을 동시에, 서로 독립적으로 렌더링할 수 있어요. 슬롯마다 개별 loading/error 처리도 가능해요.',
    whereUsed:
      '대시보드처럼 여러 위젯(분석, 주문 목록 등)이 서로 다른 속도로 로딩되는 화면에 주로 쓰여요.',
    concepts: [
      '(dashboard)/layout.tsx는 사이드바, (dashboard)/dashboard/layout.tsx는 @analytics/@orders 슬롯을 그리드로 배치',
      '@analytics 슬롯은 loading.tsx 파일 컨벤션, @orders 슬롯은 수동 Suspense로 비교',
    ],
    linkType: 'demo',
    href: '/dashboard',
  },
  {
    id: 'photos',
    title: 'Photos (Parallel + Intercepting Routes)',
    category: 'Parallel & Intercepting Routes',
    description: 'Parallel Routes + Intercepting Routes 조합',
    whatIsIt:
      '`(..)` 로 시작하는 Intercepting Route는 Link로 이동할 땐 모달을 가로채서 보여주고, 새로고침하면 원래의 전용 페이지가 그대로 보이게 해줘요.',
    whereUsed:
      'Instagram, Pinterest처럼 목록에서 클릭하면 모달로 뜨지만 새로고침하면 전용 페이지로 보이는 UX에 쓰여요.',
    concepts: [
      'photos/layout.tsx가 children + modal 슬롯을 함께 렌더링',
      'photos/@modal/(..)photos/[id]/page.tsx가 클릭 시 모달로 가로챔',
      "새로고침 시엔 photos/[id]/page.tsx 전용 페이지로 이동, use() Hook으로 Promise params 처리",
    ],
    linkType: 'demo',
    href: '/photos',
  },

  // ── 동적 라우팅 ──────────────────────────────
  {
    id: 'blog-list',
    title: 'Blog 목록',
    category: '동적 라우팅',
    description: '정적 목록 페이지 + Link 컴포넌트',
    whatIsIt:
      '<Link>는 클라이언트 사이드 네비게이션과 자동 프리페칭을 제공하는 Next.js 전용 컴포넌트예요.',
    whereUsed: '앱 내부의 페이지 이동에는 기본적으로 <a> 대신 <Link>를 사용해요.',
    concepts: ['<Link> vs <a> 차이', 'Prefetching'],
    linkType: 'demo',
    href: '/blog',
  },
  {
    id: 'blog-slug',
    title: 'Blog 상세 ([slug])',
    category: '동적 라우팅',
    description: '동적 라우팅 [slug]',
    whatIsIt:
      '폴더명을 대괄호로 감싸면(`[slug]`) 그 값이 런타임에 파라미터로 들어오는 동적 세그먼트가 돼요.',
    whereUsed:
      '블로그 글, 상품 상세, 유저 프로필처럼 값이 여러 개인 상세 페이지에 필수적으로 쓰여요.',
    concepts: [
      'params.slug로 값 접근',
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
    description: '선택적 catch-all 라우팅 [[...slug]]',
    whatIsIt:
      '`[[...slug]]`는 옵셔널 catch-all 세그먼트로, 슬러그가 없어도(`/docs`) 여러 개여도(`/docs/a/b/c`) 하나의 페이지에서 다 받을 수 있어요.',
    whereUsed:
      '문서 사이트처럼 깊이가 가변적인 트리 구조 콘텐츠에 적합해요.',
    concepts: [
      'slug가 없어도 매칭 (/docs)',
      '있으면 배열로 받음 (/docs/a/b/c → [\'a\',\'b\',\'c\'])',
    ],
    linkType: 'demo',
    href: '/docs',
  },

  // ── Streaming ────────────────────────────────
  {
    id: 'streaming',
    title: 'Streaming SSR',
    category: 'Streaming',
    description: 'Streaming SSR + Suspense',
    whatIsIt:
      '<Suspense fallback>으로 감싼 부분만 스트리밍으로 나중에 채워 넣어서, 무거운 데이터를 기다리지 않고 먼저 화면을 그릴 수 있게 해줘요.',
    whereUsed:
      '느린 API를 호출하는 대시보드나 커머스 상세 페이지에서 스켈레톤 UI와 함께 자주 사용돼요.',
    concepts: [
      '컴포넌트별 독립 로딩, 스켈레톤 UI',
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
    description: 'Server Actions 실습',
    whatIsIt:
      "'use server' 함수를 폼의 action으로 바로 넘겨서, 별도 API 라우트 없이 서버에서 mutation을 처리하는 기능이에요.",
    whereUsed:
      '글쓰기, 좋아요, 댓글처럼 폼 제출 기반 mutation에 API 라우트 대신 자주 사용돼요.',
    concepts: [
      "'use server' 선언, useActionState (React 19)",
      'FormData, revalidatePath, 유효성 검사',
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
      'Zustand(클라이언트 전역 상태)와 TanStack Query(서버 캐시 상태)를 함께 써서 두 상태의 역할을 분리하는 패턴이에요.',
    whereUsed:
      '실무에서 흔한 조합으로, 모달/탭 같은 UI 상태는 Zustand, 서버에서 가져온 데이터는 TanStack Query로 관리해요.',
    concepts: [
      'Zustand useModalStore로 모달 전역 상태 관리',
      'persist 미들웨어(createJSONStorage + partialize) 실험 후 현재는 주석 처리',
      'useQuery / useMutation / invalidateQueries, Dehydration/Hydration, Optimistic Update',
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
      'proxy.ts(미들웨어)가 보호된 경로 접근을 가로채서 인증 여부를 검사하고, 토큰이 없으면 이 페이지로 리다이렉트해요.',
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
      'proxy.ts의 matcher에 걸리는 요청마다 로깅 → 인증 체크 → 보안 헤더 추가 순서로 실행돼요. /dashboard는 auth-token 쿠키가 없으면 /login으로 리다이렉트돼요.',
    whereUsed: 'Next.js Middleware로 구현하는 인증 가드의 전형적인 예시예요.',
    concepts: [
      '쿠키 없으면 /login 리다이렉트',
      'matcher로 정적 파일 제외',
      'Link 이동 시엔 proxy가 실행되지 않아 layout에서 2차 체크가 필요',
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
      '라우트 트리의 특정 구간에서 발생한 런타임 에러를 그 구간만 감싸서 처리하는 파일 컨벤션(Error Boundary)이에요.',
    whereUsed:
      '결제, 데이터 조회처럼 실패할 수 있는 기능 근처에 배치해서 앱 전체가 죽지 않도록 막아줘요.',
    concepts: ['error.tsx는 Client Component', 'reset()으로 재시도 가능'],
    linkType: 'trigger',
    href: '/blog/hello-world?error=true',
  },
  {
    id: 'not-found-trigger',
    title: '404 페이지 (not-found.tsx) 트리거',
    category: '에러 처리',
    description: '존재하지 않는 블로그 slug로 접근해 not-found.tsx 확인',
    whatIsIt: 'notFound() 호출 시 가장 가까운 not-found.tsx를 렌더링하는 파일 컨벤션이에요.',
    whereUsed:
      '존재하지 않는 게시글/상품 등 리소스 조회 실패를 사용자에게 자연스럽게 보여줄 때 써요.',
    concepts: ['notFound() 함수 호출', '라우트 세그먼트별로 다른 not-found.tsx 배치 가능'],
    linkType: 'trigger',
    href: '/blog/this-slug-does-not-exist',
  },

  // ── API Routes (화면 없음 → 노션) ─────────────
  {
    id: 'api-posts',
    title: 'Route Handler (GET/POST /api/posts)',
    category: 'API Routes',
    description: 'Route Handler 기본 구조',
    whatIsIt: 'app 라우터에서 REST 스타일 API 엔드포인트를 만드는 파일 컨벤션이에요.',
    whereUsed: '외부에 노출할 API, 웹훅 수신, 클라이언트가 호출할 커스텀 엔드포인트에 써요.',
    concepts: ['GET / POST 핸들러 분리', 'Response.json(), searchParams', '유효성 검사, HTTP 상태 코드'],
    linkType: 'notion',
    href: '#',
  },
  {
    id: 'api-posts-id',
    title: '동적 Route Handler (/api/posts/[id])',
    category: 'API Routes',
    description: '동적 Route Handler',
    whatIsIt: 'Route Handler에도 [id] 같은 동적 세그먼트를 붙일 수 있어요.',
    whereUsed: '특정 리소스 하나를 조회/수정/삭제하는 REST 엔드포인트(GET/PUT/DELETE)에 써요.',
    concepts: ['params 두 번째 인자', 'findIndex / splice', '404 처리'],
    linkType: 'notion',
    href: '#',
  },
  {
    id: 'api-webhook',
    title: 'Webhook + revalidateTag',
    category: 'API Routes',
    description: '웹훅 + revalidateTag 개념 이해',
    whatIsIt:
      '외부 서비스(결제 등)가 이벤트 발생 시 우리 서버로 호출해주는 콜백 엔드포인트예요. revalidateTag로 관련 캐시를 그 즉시 무효화할 수 있어요.',
    whereUsed: '결제 완료 알림, CMS 콘텐츠 변경 알림 같은 외부 이벤트 수신에 써요.',
    concepts: ['외부 서비스 웹훅 수신', 'revalidateTag로 캐시 무효화'],
    linkType: 'notion',
    href: '#',
  },

  // ── SEO (실제로 서빙되는 경로라 데모 가능) ─────
  {
    id: 'robots',
    title: 'robots.ts',
    category: 'SEO',
    description: 'MetadataRoute.Robots로 robots.txt 동적 생성',
    whatIsIt: '검색엔진 크롤러에게 어떤 경로를 긁어가도 되는지 알려주는 robots.txt를 코드로 생성해요.',
    whereUsed: '크롤러별로 접근 허용 범위를 다르게 주고 싶을 때(AI 봇 차단 등) 씁니다.',
    concepts: [
      "UA별 규칙 분기 (* 는 /dashboard, /api/, /_next/ disallow, GPTBot은 전체 disallow)",
      'sitemap 필드로 sitemap.xml 위치 명시',
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
      '정적 URL + posts.map()으로 동적 URL 생성',
      'changeFrequency / priority 설정',
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
    whatIsIt: '컴포넌트/스토어 단위로 렌더링과 동작을 자동 검증하는 테스트 코드예요.',
    whereUsed: '리팩터링이나 배포 전에 회귀 버그를 잡기 위해 실무에서 필수적으로 사용해요.',
    concepts: [
      "next/jest.js의 nextJest() 헬퍼, testEnvironment: 'jsdom'",
      "moduleNameMapper로 @/ alias 매핑",
      'Counter, useModalStore, PostList 테스트',
    ],
    linkType: 'notion',
    href: '#',
  },

  // ── 설정 (화면 없음 → 노션) ────────────────────
  {
    id: 'config-and-proxy',
    title: '공통 설정 & proxy.ts 인터셉터',
    category: '설정',
    description: 'reactStrictMode, jest 설정 등 공통 설정 파일 + 미들웨어 상세',
    whatIsIt:
      'reactStrictMode는 개발 중 컴포넌트를 이중 렌더링해서 Hydration 불일치 같은 버그를 미리 잡아줘요. proxy.ts는 모든 요청의 시작점에서 실행되는 인터셉터예요.',
    whereUsed:
      '모든 Next.js 프로젝트의 기본 설정이자, 인증/로깅/보안 헤더처럼 요청 단위로 공통 처리가 필요할 때 미들웨어를 씁니다.',
    concepts: [
      'next.config.ts의 reactStrictMode: true',
      '로깅, 인증 체크, 보안 헤더 추가, matcher로 정적 파일 제외',
    ],
    linkType: 'notion',
    href: '#',
  },
]