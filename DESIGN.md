# DESIGN.md

> 가이드 랜딩페이지 + 쇼케이스화 작업에서 참고하는 디자인 스펙.
> 새로운 디자인 시스템을 새로 만드는 게 아니라, 기존 Tailwind v4 + shadcn/ui 톤 위에
> 포인트 컬러와 반응형 규칙만 얹는 정도로 최소한으로 다듬는 걸 목표로 함.

## 컨셉

- **미니멀 & 깔끔** — 그라데이션, 강조 컬러 남발, 화려한 애니메이션 없이 여백/타이포 계층으로 정리
- 학습용 프로젝트라는 걸 숨기지 않고, 개발자 도구/문서 사이트 느낌의 담백한 톤 유지
- 라이트 모드 우선. 다크모드는 이번 작업 범위 아님 (`globals.css`에 `.dark` 블록이 이미 있으니, 나중에 별도 작업으로 값만 채우면 됨)

## 스타일링 규칙

- 클래스 병합/조건부 스타일은 항상 `cn()`을 통해서 처리 (문자열 직접 concat 지양)
- variant가 필요한 컴포넌트는 cva로 정의 (`src/components/ui/Badge.tsx`, `Button.tsx` 참고)
- shadcn/ui 컴포넌트(`components/ui/*`)는 라이브러리 원본 구조를 유지하고, 페이지별 커스텀 스타일은 해당 페이지 쪽에서 처리
- `globals.css`의 `@theme inline`에 정의된 토큰(`bg-primary`, `text-muted-foreground`, `border-border` 등)을 우선 사용. 하드코딩 색상(`text-gray-500`, `bg-blue-500` 등)은 기존 학습 페이지에 이미 많으므로 강제로 전부 바꾸지 말고, 새로 손대는 페이지부터 점진적으로 토큰 기반으로 정리

## 컬러 — 밝은 녹색 계열로 `--primary` 토큰 교체

현재 `src/app/global.css`의 `:root`는 전부 무채색(oklch 채도 0)이에요. 아래 토큰만 녹색으로 교체합니다 (그 외 `--background`, `--card`, `--border` 등은 그대로 유지):

| 토큰 | 현재 (무채색) | 변경 후 (녹색) | 비고 |
|------|--------------|---------------|------|
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.72 0.19 149)` | 밝고 선명한 녹색 (Tailwind green/emerald 500 근처 톤) |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.18 0.03 149)` | 밝은 녹색 위에 올라가는 글자는 흰색 대신 진한 녹색-블랙으로 (대비 확보) |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.72 0.19 149)` | 포커스 링도 포인트 컬러와 통일 |
| `--sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.72 0.19 149)` | 대시보드 사이드바 강조 요소 |
| `--sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.72 0.19 149)` | 위와 동일 이유 |

- `Badge.tsx`의 `success` variant는 이미 `bg-green-100 text-green-800`으로 녹색 계열이라 별도 수정 없이 톤이 자연스럽게 맞음
- `Button.tsx`의 `default` variant(`bg-primary`)는 토큰 교체만으로 자동으로 녹색 버튼이 됨

## 타이포그래피

- 폰트: 기존 **Geist** 그대로 유지 (`src/app/layout.tsx`에 이미 설정됨)
- 새로운 타입 스케일을 만들지 않고, 지금까지 페이지들에서 써온 조합 그대로 재사용
  - 페이지 타이틀: `text-3xl font-bold`
  - 섹션 제목: `text-xl font-bold`
  - 본문/설명: `text-sm` ~ `text-base`, `text-muted-foreground`

## 반응형 그리드 (랜딩 페이지 카드)

모바일 퍼스트로 Tailwind 기본 breakpoint 사용:

| 구간 | 열 수 | Tailwind |
|------|------|----------|
| 모바일 (기본) | 1열 | `grid-cols-1` |
| 태블릿 (`md:`, 768px~) | 2열 | `md:grid-cols-2` |
| 데스크톱 (`lg:`, 1024px~) | 3열 | `lg:grid-cols-3` |

카드 자체도 내부 텍스트(설명, 핵심 개념 목록)가 긴 편이라 3열까지만 두고 4열은 가지 않음 (가독성 우선).

## 아이콘 (lucide-react)

카테고리별로 아이콘 하나씩 매핑해서 카드 헤더에 표시. 이미 설치된 `lucide-react`만 사용, 추가 아이콘 라이브러리 도입 안 함:

| 카테고리 | 아이콘 |
|---------|--------|
| 기초 공사 | `Hammer` |
| 라우팅 기초 | `Route` |
| Route Group | `FolderTree` |
| 동적 라우팅 | `Braces` |
| Parallel & Intercepting Routes | `LayoutGrid` |
| Streaming | `Waves` |
| Server Actions | `Server` |
| 상태관리 | `Boxes` |
| 인증 | `ShieldCheck` |
| 에러 처리 | `AlertTriangle` |
| API Routes | `Webhook` |
| SEO | `Search` |
| 테스트 | `FlaskConical` |
| 설정 | `Settings` |

## 랜딩 페이지 레이아웃

1. **히어로 섹션** — 상단에 타이틀("Next.js 기능 학습 아카이브" 톤) + 이 프로젝트가 뭔지 2~3줄 소개, 카테고리 필터 정도만 (검색창 등 과한 기능 추가 안 함)
2. **카드 그리드** — 위 반응형 규칙대로, `src/data/study-routes.ts`를 순회해 카테고리별로 묶어서 렌더링
3. **카드 구성 요소** — 카테고리 아이콘, 제목, 학습 목적(`description`) 한 줄, "데모 보기" / "노션에서 보기 ↗" 구분 배지(`linkType`에 따라 `Badge` variant 다르게: `demo`/`trigger`는 `default`, `notion`은 `outline`)

## 전역 네비게이션 요소

- `src/app/layout.tsx`에 "홈으로" 버튼을 고정 배치 — 카드 클릭 후 데모/노션 페이지로 이동하면 브라우저 뒤로가기 말고는 랜딩으로 돌아올 방법이 없어서 추가
- 화면 하단 중앙 고정(`fixed bottom-6 left-1/2 -translate-x-1/2`), 아이콘(`Home`, size-5) + 텍스트(`text-base`), `Badge`와 톤을 맞춘 pill 버튼(`border-border`/`bg-card`/`text-muted-foreground`, hover 시 `border-primary`/`text-primary`)
- `z-40` — `/photos` 인터셉트 모달(`z-50`)보다 낮게 둬서 모달이 열려 있을 때는 자연스럽게 가려지도록 함
- 버튼이 콘텐츠를 가리는 문제는 레이아웃에 패딩을 넣는 대신(일부 페이지가 `min-h-screen` + 중앙 정렬을 쓰고 있어 스크롤/정렬이 깨질 위험) `bottom-0` 고정 그라디언트 스크림(`h-24 bg-gradient-to-t from-background to-transparent`, `pointer-events-none`, `z-30`)으로 해결 — 레이아웃에는 전혀 영향 없이 시각적으로만 자연스럽게 페이드

## 디자인 원칙 (기존 페이지 손볼 때)

- 카드/여백/타이포 계층만 정리하고, 각 라우트의 구조적 학습 포인트(Route Group 분리, Parallel/Intercepting Routes 등)는 절대 건드리지 않음 (`CLAUDE.md` 참고)
- 위 "스타일링 규칙"을 그대로 따름 — 새 컴포넌트 남발 금지, `--primary` 토큰 하나로만 포인트, 임의의 색상(`bg-blue-500` 등) 신규 추가 금지