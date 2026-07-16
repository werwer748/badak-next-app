# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 지켜야 할 컨벤션을 정리합니다.

## 프로젝트 개요

- `create-next-app` 없이 직접 구성한 Next.js 16 (App Router) + React 19 + TypeScript 프로젝트
- 원래 목적은 Next.js 기능을 하나씩 실습해보는 학습용 프로젝트였고, 지금은 그 결과물을 "가이드 랜딩페이지 + 쇼케이스 앱"으로 다듬는 작업을 진행 중
- 각 라우트가 어떤 개념을 학습하기 위해 만들어졌는지는 `STUDY_PAGES.md`, 쇼케이스화 작업 진행 상황은 `TODO.md` 참고

## 기술 스택

- Next.js 16 (App Router), React 19
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` 토큰 방식 — v3의 `@tailwind base/components/utilities` 문법 아님)
- shadcn/ui, Radix UI
- `class-variance-authority`(cva) + `clsx` + `tailwind-merge` → `src/lib/utils.ts`의 `cn()`
- Zustand (클라이언트 상태) + TanStack Query (서버 캐시 상태)
- Jest + Testing Library (`next/jest.js` 헬퍼, jsdom 환경)

## 폴더 / 네이밍 컨벤션

- `src/app/` 아래 폴더 구조가 곧 URL 구조. Route Group `(name)` 은 URL에 영향 주지 않고 layout만 분리
- 언더스코어 prefix 폴더(`_components/`, `_component/`)는 라우팅 대상이 아닌, 해당 라우트 전용 컴포넌트 모음
- Server Actions는 `src/app/actions/*.ts` 에 모아두고 파일 최상단에 `'use server'`
- 재사용 가능한 UI 프리미티브는 `src/components/ui/` (shadcn 스타일 + cva 기반 variant)
- 전역 상태 스토어는 `src/store/*.ts`, Context/Provider는 `src/providers/*.tsx`
- path alias `@/*` → `./src/*` (tsconfig, jest 양쪽 모두 설정됨)
- 테스트 파일은 대상 파일과 같은 폴더에 co-locate (`Foo.tsx` 옆에 `Foo.test.tsx`)

## 상태 관리 역할 분담

- **Zustand**: UI 로컬/전역 상태 전용 (예: 모달 open/close). 서버 데이터 캐싱 용도로 쓰지 않음
- **TanStack Query**: 서버 데이터 fetch/캐싱/mutation. SSR→CSR 전달은 `prefetchQuery` + `dehydrate()`/`HydrationBoundary` 패턴 사용
- **Server Actions**: form 기반 mutation. `useActionState` (React 19)로 pending/에러 상태를 다룸

## 테스트

- 실행: `npm test` / `npm run test:watch`
- 새 컴포넌트나 스토어를 추가하면 최소한의 렌더링 + 핵심 동작 테스트를 같은 폴더에 co-locate

## 배포

- 배포 플랫폼은 **Vercel**
- `TODO.md`의 각 단계를 완료할 때마다 그 시점에 배포함 (한 번에 몰아서 배포하지 않음) — 그러니 각 단계 작업은 항상 그 자체로 빌드/배포 가능한 상태로 마무리할 것 (`npm run build` 기준으로 깨지지 않아야 함)
- 노션 링크가 아직 `'#'` placeholder인 항목(`src/data/study-routes.ts`의 `linkType: 'notion'`)이 있어도 배포 자체는 진행함 — 실제 URL은 나중에 채워도 되는 부분
- 저장소는 public이라 첫 배포 전에 Git/Vercel 설정 체크리스트를 확인함 (`TODO.md`의 "배포 전 확인" 항목): Vercel의 fork PR 자동배포·환경변수 노출 여부, GitHub `main` 브랜치 force-push 금지

## 문서 관리

- `STUDY_PAGES.md`: 각 라우트가 어떤 Next.js 개념 학습을 위해 만들어졌는지 정리하는 문서. 라우트를 추가/변경하면 이 파일도 함께 업데이트
- `TODO.md`: 현재 진행 중인 작업(가이드 랜딩페이지 + 쇼케이스화)의 단계별 체크리스트. 작업을 시작/완료할 때마다 체크 상태를 갱신하면서 진행
- `DESIGN.md`: 스타일링 규칙(cn/cva, 컬러 토큰), 반응형 그리드, 아이콘 매핑, 랜딩 페이지 레이아웃 등 디자인 관련 내용은 전부 이 문서에 정리. 디자인/스타일 관련 작업은 여기서 새로 정하지 말고 이 문서를 따를 것

## 작업 시 주의사항

- 이 프로젝트는 학습/비교 목적의 의도된 실험들을 포함하고 있음 (예: `@analytics` 슬롯은 `loading.tsx`, `@orders` 슬롯은 수동 `Suspense`로 비교, Zustand `persist` 미들웨어는 실험 후 주석 처리) — 정리한답시고 이런 의도된 코드를 임의로 삭제하거나 통일하지 말 것
- 디자인을 다듬을 때도 각 라우트의 구조적 학습 포인트(Route Group 분리, Parallel Routes, Intercepting Routes 등)는 건드리지 않고 스타일링(여백/타이포/카드 UI)만 손볼 것
- 새 패턴을 도입하기 전에 기존 코드에 유사한 사례가 있는지 먼저 확인하고, 있다면 그 컨벤션을 따를 것