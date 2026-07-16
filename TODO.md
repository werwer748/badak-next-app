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

> ⚠️ Counter 카드가 `/counter`를 가리키므로, 4번(Counter 이동)을 3번과 같이 진행해야 첫 배포 때 링크가 안 깨짐

- [ ] `/` 페이지를 가이드 랜딩으로 교체
- [ ] 카테고리별 카드 그리드 UI
- [ ] 카드에 "데모 보기" / "노션에서 보기 ↗" 구분 배지
- [ ] 에러 트리거 카드 추가 (`/blog/hello-world?error=true` → error.tsx, 존재하지 않는 경로 → not-found.tsx)

## 4. Counter 이동

- [ ] `src/app/_components/Counter.tsx` (+ 테스트) → `src/app/counter/` 로 이동
- [ ] import 경로 점검
- [ ] `npm test` 통과 확인

## 배포 전 확인 (Git/Vercel 설정) — 3, 4번과 함께 진행

> 3, 4번 작업 완료 후 첫 배포를 나가기 전에 아래 두 가지도 같이 체크

- [ ] Vercel 프로젝트 Settings → Git에서 fork PR 자동 배포 시 환경변수 노출 여부 확인 (필요시 fork PR 자동배포 끄기)
- [ ] GitHub 저장소 Settings → Branches에서 `main` 브랜치 force-push 금지 설정

## 5. 각 데모 페이지 설명 배너

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
