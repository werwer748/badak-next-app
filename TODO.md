# TODO — 가이드 랜딩페이지 & 쇼케이스화

> 학습용으로 만든 Next.js 프로젝트를, 각 라우트가 무슨 개념을 학습한 건지 보여주는
> 가이드 랜딩페이지 + 쇼케이스 앱으로 다듬는 작업. 단계별로 체크하면서 진행.

> **배포**: Vercel. 한 번에 몰아서 배포하지 않고, 아래 단계를 하나 완료할 때마다 그 시점에 배포함.
> 1~3단계 완료 후 최초 배포 예정, 이후로는 단계별 완료 시마다 배포.

## 1. 문서 작업

- [x] `CLAUDE.md` 작성 — 프로젝트 컨벤션 정리
- [x] `TODO.md` 작성 — 이 파일

## 2. 데이터 소스 (단일 진실 공급원)

- [x] `src/data/study-routes.ts` 작성
  - 타입: `id`, `title`, `category`, `description`(학습 목적), `whatIsIt`(이게 뭔지), `whereUsed`(실무에서 어디 쓰이는지), `concepts`(핵심 개념 목록), `linkType`(`'demo' | 'trigger' | 'notion'`), `href`
  - 노션 관련 항목(API Routes, 테스트, 설정)은 `href: '#'` placeholder — 나중에 실제 노션 URL로 교체
  - 인증 가드 체험 / error.tsx / not-found.tsx는 `trigger` 타입으로 별도 카드 추가 (기존 계획에 없던 보너스 항목)

## 3. 랜딩 페이지

- [x] `/` 페이지를 가이드 랜딩으로 교체 (`src/app/page.tsx`, 히어로 + 카테고리 앵커 네비 + 카드 그리드)
- [x] 카테고리별 카드 그리드 UI (`src/components/StudyRouteCard.tsx`, `src/lib/category-icons.tsx`, 반응형 1/2/3열)
- [x] 카드에 "데모 보기" / "체험하기" / "노션에서 보기 ↗" 구분 배지
- [x] 에러 트리거 카드 추가 (`study-routes.ts`에 이미 trigger 항목으로 존재 — `/blog/hello-world?error=true`, 존재하지 않는 slug)

## 4. Counter 이동

- [x] `src/app/_components/Counter.tsx` (+ 테스트) → `src/app/counter/_components/`로 이동, `src/app/counter/page.tsx` 신설
- [x] import 경로 점검
- [x] `npm test` 통과 확인 (PostList.test.tsx 1건은 이 작업과 무관한 기존 flaky 테스트로 확인 — 변경 전 코드에서도 동일하게 실패함)
- [x] (보너스) `npm run build` 중 발견한 기존 버그 수정: `src/app/layout.tsx`의 `RootLayout` prop 타입에 실제로 없는 `modal: React.ReactNode`가 필수로 박혀있어 Next 16 typed routes 체크에서 빌드 자체가 실패하던 문제 — 타입에서 제거 (루트에는 `@modal` 슬롯이 없음, `photos/@modal`과 무관)
- [x] `src/app/global.css`의 `--primary`/`--primary-foreground`/`--ring`/`--sidebar-primary`/`--sidebar-ring`을 DESIGN.md 스펙대로 녹색 계열로 교체

## 배포 전 확인 (Git/Vercel 설정) — 3, 4번과 함께 진행

> 3, 4번 작업 완료 후 첫 배포를 나가기 전에 아래 두 가지도 같이 체크. 대시보드 설정이라 직접 진행 필요.

- [x] GitHub 저장소 Settings → Rulesets에서 `main`(Include default branch) 대상 **Block force pushes** 설정 완료
- [ ] Vercel 프로젝트 Settings → Git에서 fork PR 자동 배포 시 환경변수 노출 여부 확인 — 지금은 프로젝트에 환경변수가 아예 없어서 위험도 0, **실제 env var를 처음 추가하는 시점**에 다시 체크
- [x] Vercel 계정 2FA(인증 앱) 설정 완료
- [x] **첫 배포 완료** (Vercel + GitHub 연동, `main` 브랜치 기준 자동 배포) — 이후 `main` push마다 자동 재배포됨

## 5. 각 데모 페이지 설명 배너 (+ 노션 실제 기록 반영)

> 노션 연동 후, 페이지마다 넣는 `whatIsIt`/`whereUsed` 설명을 지금까지 작성한 일반론이 아니라
> 사용자가 실제로 학습하면서 노션에 기록해둔 내용을 다듬어서 반영. `study-routes.ts`의 `linkType: 'notion'`
> 항목들(API Routes, 테스트, 설정)의 `href: '#'` placeholder도 이때 실제 노션 URL로 교체.

- [x] 노션 연결 확인 후, 각 카테고리별 사용자의 실제 노션 기록 내용 확인
- [x] `study-routes.ts`의 `description`/`whatIsIt`/`whereUsed`/`concepts`를 노션 기록 기반으로 다듬기 (일반론 → 실제 학습 과정/삽질 경험 반영) — 노션 Phase 순서대로 전체 완료
  - [x] `기초 공사` 카테고리 신규 추가 (Phase1 렌더링 원리/Hydration, Phase2 package.json/폴더구조/기본화면+Tailwind — 데모 라우트가 없어 노션 카드 5개로 구성). `StudyCategory` 타입, `category-icons.tsx`(`Hammer` 아이콘), `page.tsx`의 `CATEGORY_ORDER`, `DESIGN.md` 아이콘 표도 함께 갱신
  - [x] `라우팅 기초` (Counter) — Component 노션 페이지의 실제 Hydration 불일치 삽질 경험 반영
  - [x] `Route Group` (about) — "라우팅 방식" 노션 페이지 반영
  - [x] `동적 라우팅` (blog-list, blog-slug, docs-catchall) — 같은 노션 페이지, params Promise/catch-all 단계별 차이 반영
  - [x] `Parallel & Intercepting Routes` (dashboard, photos) — 같은 노션 페이지, Suspense vs loading.tsx 실험 결과 + 세그먼트 기준 인터셉트 원리 반영
  - [x] `Streaming` — 같은 노션 페이지, CSR/SSR 흰화면 한계 → Suspense로 해결하는 흐름 반영
  - [x] `Server Actions` — Route Handler 대비 왕복 횟수/RSC 페이로드 비교 반영
  - [x] `상태관리` — Zustand + TanStack Query 노션 페이지, QueryProvider 분리 이유/Optimistic Update 등 반영
  - [x] `인증` (login, auth-guard-trigger) — Proxy 노션 페이지, middleware→proxy 개명/Edge Runtime 제약/matcher 정규식 반영
  - [x] `에러 처리` (error-boundary-trigger, not-found-trigger) — error 페이지 노션, Client/Server Component 구분·버블링 순서 반영
  - [x] `API Routes` (api-posts, api-posts-id, api-webhook) — Route Handlers/캐시? 노션 페이지 반영
  - [x] `SEO` (robots, sitemap) — 크롤 버짓, robots.txt는 보안 수단 아님, sitemap 5만 개 제한 반영
  - [x] `테스트` (testing) — Jest 노션 페이지, Jest/RTL 역할 구분·renderHook·jest.mock 반영
  - [x] `설정` (config-and-proxy) — Proxy/폴더구조 노션 페이지, proxy가 할 수 있는 일/없는 일 반영
- [x] `notion` linkType 항목들의 `href`를 실제 노션 페이지 URL로 교체 (API Routes 3개 + 테스트 + 설정, 총 5개 항목 전부 완료)
- [ ] `src/components/StudyNote.tsx` 공용 컴포넌트 작성 (`study-routes.ts` 데이터 참조해서 렌더링)
- [ ] 아래 페이지 상단에 배너 삽입
  - [ ] `/counter`
  - [ ] `(marketing)/about`
  - [ ] `(dashboard)/dashboard`
  - [ ] `/blog`, `/blog/[slug]`
  - [ ] `/docs/[[...slug]]`
  - [ ] `/photos`, `/photos/[id]`
  - [ ] `/streaming`
  - [ ] `/server-actions-demo`
  - [ ] `/state-demo`
  - [ ] `/login`

## 6. 디자인 라이트 터치

- [ ] `about`, `docs`, `login`, `blog` 목록 등 텍스트만 있는 페이지 여백/타이포/카드 정리
- [ ] 구조적 학습 포인트(레이아웃 분리, parallel/intercepting routes 등)는 변경하지 않음

## 7. 문서 동기화

- [ ] `STUDY_PAGES.md`에 랜딩 페이지 자체를 새 섹션/카드로 추가
- [ ] 루트(`/`) 역할 변경 및 Counter 이동 반영

## 8. 검증

- [ ] `npm run dev` 로 전체 플로우 수동 확인 (랜딩 → 각 데모 → 뒤로가기, 에러 트리거)
- [ ] `npm test` 전체 통과 확인
