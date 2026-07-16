# 📚 Next.js 공부 페이지 정리

> `create-next-app` 없이 직접 구성한 Next.js 16 프로젝트
> 각 페이지가 어떤 개념을 학습하기 위해 만들어졌는지 정리합니다.

---

## 📁 전체 폴더 구조

```
src/app/
  (marketing)/
    about/
  (dashboard)/
    dashboard/
  blog/
    [slug]/
  docs/
    [[...slug]]/
  photos/
    [id]/
    @modal/
      (..)photos/
        [id]/
  streaming/
  server-actions-demo/
  state-demo/
  login/
  api/
    posts/
      [id]/
    webhook/
      payment/
  robots.ts
  sitemap.ts
  _components/
    Counter.tsx
```

---

## 🏠 루트 페이지

### `/`
- **경로** `src/app/page.tsx`
- **학습 목적** Server Component 기본 구조 이해
- **핵심 개념** `page.tsx` 가 곧 라우트, Server Component 기본값, 소스 보기에서 HTML 확인

### Counter (테스트용 컴포넌트)
- **경로** `src/app/_components/Counter.tsx`
- **학습 목적** Client Component 기본 (`useState`, `useEffect`) + 테스트 대상
- **핵심 개념** `'use client'` 선언, `setInterval` 로 매초 갱신되는 시각 표시, `Counter.test.tsx` 에서 렌더링/클릭 테스트

---

## 🎨 Route Group

### `/about`
- **경로** `src/app/(marketing)/about/page.tsx`
- **학습 목적** Route Group `(폴더)` 패턴 이해
- **핵심 개념** URL에 영향 없이 layout 분리, `(marketing)` 그룹은 헤더만 있는 심플한 layout

### `/dashboard`
- **경로** `src/app/(dashboard)/dashboard/page.tsx`
- **학습 목적** Route Group + Parallel Routes 조합
- **핵심 개념**
  - `(dashboard)/layout.tsx` 는 사이드바 UI 담당, `(dashboard)/dashboard/layout.tsx` 는 `@analytics` / `@orders` 슬롯을 그리드로 배치하는 별도 layout — 레이아웃이 두 겹으로 중첩됨
  - `@analytics` 슬롯에는 `loading.tsx` 파일 컨벤션 적용 (자동 로딩 UI), `@orders` 슬롯은 수동 `<Suspense fallback>` 으로 감싸서 두 방식을 비교
  - `layout.tsx` 안에서 `@analytics` 용 `<Suspense>` 는 실험 차 주석 처리해둔 상태 (loading.tsx만으로 로딩 처리되는지 확인용)

---

## 📝 블로그 (동적 라우팅)

### `/blog`
- **경로** `src/app/blog/page.tsx`
- **학습 목적** 정적 목록 페이지 + Link 컴포넌트
- **핵심 개념** `<Link>` vs `<a>` 차이, Prefetching

### `/blog/[slug]`
- **경로** `src/app/blog/[slug]/page.tsx`
- **학습 목적** 동적 라우팅 `[slug]`
- **핵심 개념** `params.slug` 로 값 접근, `generateMetadata` 동적 메타데이터, Open Graph, JSON-LD 구조화 데이터, `notFound()` 함수, `error.tsx` / `not-found.tsx` 에러 처리

---

## 📚 Docs (Catch-all 라우팅)

### `/docs/...`
- **경로** `src/app/docs/[[...slug]]/page.tsx`
- **학습 목적** 선택적 catch-all 라우팅 `[[...slug]]`
- **핵심 개념** slug가 없어도 매칭 (`/docs`), 있으면 배열로 받음 (`/docs/a/b/c` → `['a','b','c']`), `string[]` 타입

---

## 🖼 사진 (Parallel Routes + Intercepting Routes)

### `/photos`
- **경로** `src/app/photos/page.tsx`
- **학습 목적** Parallel Routes + Intercepting Routes 조합
- **핵심 개념**
  - `photos/layout.tsx` 가 `children` + `modal` 슬롯을 함께 렌더링
  - `@modal` 슬롯 매칭 안 될 때 `photos/@modal/default.tsx` 가 fallback (아무것도 안 그림)
  - `photos/default.tsx` 는 `children` 슬롯의 fallback ("사진!!!" 텍스트로 동작 확인용)

### `/photos/[id]`
- **경로** `src/app/photos/[id]/page.tsx`
- **학습 목적** 새로고침 시 전용 페이지로 이동
- **핵심 개념** 인터셉트 라우팅과 일반 페이지의 차이

### `/photos/[id]` (모달)
- **경로** `src/app/photos/@modal/(..)photos/[id]/page.tsx`
- **학습 목적** Intercepting Routes `(..)` 패턴
- **핵심 개념** Link 클릭 → 모달, 새로고침 → 전용 페이지, `use()` Hook으로 Promise params 처리

---

## ⚡ Streaming

### `/streaming`
- **경로** `src/app/streaming/page.tsx`
- **학습 목적** Streaming SSR + Suspense
- **핵심 개념** `<Suspense fallback>` 으로 컴포넌트별 독립 로딩, 스켈레톤 UI, FCP 개선, 소스 보기에서 `<!--$?-->` / `$RC` 확인

---

## 🔄 Server Actions 데모

### `/server-actions-demo`
- **경로** `src/app/server-actions-demo/page.tsx`
- **학습 목적** Server Actions 실습
- **핵심 개념** `'use server'` 선언, `useActionState` (React 19), FormData, `revalidatePath`, 유효성 검사, 포스트 작성/삭제

---

## 🗃 상태관리 데모

### `/state-demo`
- **경로** `src/app/state-demo/page.tsx`
- **학습 목적** Zustand + TanStack Query 조합 실습
- **핵심 개념**
  - Zustand `useModalStore` 로 모달 전역 상태 관리
  - `persist` 미들웨어(`createJSONStorage` + `partialize`)로 localStorage 영속화도 구현해봤으나, 현재는 주석 처리하고 순수 `create` 만 사용 중 (비교 실험 흔적)
  - TanStack Query `useQuery` / `useMutation` / `invalidateQueries`
  - Dehydration / Hydration 패턴 (서버 prefetch → 클라이언트 캐시 복원)
  - Optimistic Update (`onMutate` / `onError` rollback)
  - `isFetching` vs `isLoading` 차이

---

## 🔑 로그인

### `/login`
- **경로** `src/app/login/page.tsx`
- **학습 목적** proxy.ts 인증 체크 테스트용
- **핵심 개념** 토큰 없이 `/dashboard` 접근 시 리다이렉트 목적지

---

## 🌐 API Routes

### `GET/POST /api/posts`
- **경로** `src/app/api/posts/route.ts`
- **학습 목적** Route Handler 기본 구조
- **핵심 개념** `GET` / `POST` 핸들러 분리, `Response.json()`, `searchParams`, 유효성 검사, HTTP 상태 코드

### `GET/PUT/DELETE /api/posts/[id]`
- **경로** `src/app/api/posts/[id]/route.ts`
- **학습 목적** 동적 Route Handler
- **핵심 개념** `params` 두 번째 인자, `findIndex` / `splice`, 404 처리

### `POST /api/webhook/payment`
- **경로** `src/app/api/webhook/payment/route.ts`
- **학습 목적** 웹훅 + revalidateTag 개념 이해
- **핵심 개념** 외부 서비스 웹훅 수신, `revalidateTag` 로 캐시 무효화

---

## 🔍 SEO Metadata Files

### `src/app/robots.ts`
- **학습 목적** `MetadataRoute.Robots` 로 robots.txt 동적 생성
- **핵심 개념** UA별 규칙 분기 (`*` 는 `/dashboard`, `/api/`, `/_next/` disallow, `GPTBot` 은 전체 disallow), `sitemap` 필드로 sitemap.xml 위치 명시

### `src/app/sitemap.ts`
- **학습 목적** `MetadataRoute.Sitemap` 으로 sitemap.xml 동적 생성
- **핵심 개념** 정적 URL + `posts.map()` 으로 동적 URL 생성, `changeFrequency` / `priority` 설정, 실무에서는 DB에서 slug 조회해 매핑하는 패턴 주석으로 정리

---

## 🧪 테스트 (Jest + Testing Library)

### 설정
- **경로** `jest.config.ts`, `jest.setup.ts`
- **학습 목적** Next.js 프로젝트에 Jest 붙이기
- **핵심 개념** `next/jest.js` 의 `nextJest()` 헬퍼로 TS/JSX 변환 자동 설정, `testEnvironment: 'jsdom'`, `moduleNameMapper` 로 `@/` alias 매핑

### 테스트 대상
| 파일 | 테스트 대상 | 검증 내용 |
|------|------------|-----------|
| `src/app/_components/Counter.test.tsx` | `Counter.tsx` | 초기 렌더링 값, 클릭 시 상태 증가 (`user-event`) |
| `src/store/useModalStore.test.ts` | `useModalStore.ts` | Zustand 스토어 단독 로직 (open/close 상태 변화) |
| `src/app/state-demo/_component/PostList.test.tsx` | `PostList.tsx` | TanStack Query 붙은 컴포넌트 렌더링/동작 |

---

## 🛡 에러 처리 파일

| 파일 | 경로 | 역할 |
|------|------|------|
| `error.tsx` | `src/app/error.tsx` | 루트 레벨 에러 처리 |
| `global-error.tsx` | `src/app/global-error.tsx` | 루트 layout 에러 처리 (html/body 포함) |
| `not-found.tsx` | `src/app/not-found.tsx` | 전체 앱 404 처리 |
| `error.tsx` | `src/app/blog/[slug]/error.tsx` | 블로그 포스트 에러만 처리 |
| `not-found.tsx` | `src/app/blog/[slug]/not-found.tsx` | 블로그 포스트 404만 처리 |

---

## 🔒 Proxy (인터셉터)

### `src/proxy.ts`
- **학습 목적** 모든 요청의 시작점에서 실행되는 인터셉터
- **핵심 개념**
  - 로깅 (모든 요청 기록)
  - 인증 체크 (쿠키 없으면 `/login` 리다이렉트)
  - 보안 헤더 추가 (`X-Frame-Options`, `X-Content-Type-Options`)
  - `matcher` 로 정적 파일 제외
  - Link 이동 시 proxy 실행 안 됨 → layout에서 2차 체크 필요

---

## 📦 공통 설정 파일

| 파일 | 역할 |
|------|------|
| `src/app/layout.tsx` | 전체 앱 루트 layout, QueryProvider 감쌈 |
| `src/app/globals.css` | Tailwind CSS 진입점 |
| `src/lib/utils.ts` | `cn()` 함수 (clsx + tailwind-merge) |
| `src/store/useModalStore.ts` | Zustand 모달 전역 상태 |
| `src/providers/QueryProvider.tsx` | TanStack Query 클라이언트 설정 |
| `src/app/actions/posts.ts` | Server Actions 모음 |
| `src/components/ui/button.tsx` | shadcn/ui Button |
| `src/components/ui/Badge.tsx` | cva로 직접 만든 Badge |
| `next.config.ts` | Next.js 설정 (`reactStrictMode: true` — 이중 렌더링으로 Hydration 불일치 검증) |
| `proxy.ts` | 요청 인터셉터 |
| `jest.config.ts` / `jest.setup.ts` | Jest 설정 |
| `postcss.config.ts` | Tailwind CSS PostCSS 설정 |
| `src/app/robots.ts` | robots.txt 동적 생성 |
| `src/app/sitemap.ts` | sitemap.xml 동적 생성 |
