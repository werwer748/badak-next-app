# 🦋 Badak Next App

> `create-next-app` 없이 **바닥부터** 직접 만들어보는 Next.js 프로젝트

---

## 🛠 기술 스택

| 항목 | 버전 |
|------|------|
| ⚛️ Next.js | 16.x |
| 🔵 React | 19.x |
| 📘 TypeScript | 6.x |
| 📦 pnpm | - |

---

## 📁 프로젝트 구조

```
badak-next-app/
├── src/
│   └── app/
│       ├── layout.tsx     # 루트 레이아웃 (공통 shell)
│       └── page.tsx       # 홈페이지 (/ 라우트)
├── next.config.ts          # Next.js 설정
├── tsconfig.json           # TypeScript 설정
├── package.json
└── pnpm-lock.yaml
```

---

## ✅ 진행 현황

- [x] 📦 프로젝트 초기 세팅 (package.json, tsconfig.json, next.config.ts)
- [x] 🗂 App Router 기본 구조 구성 (`src/app/`)
- [x] 🧩 루트 레이아웃 작성 (`layout.tsx`)
- [x] 🏠 홈 페이지 작성 (`page.tsx`)
- [x] 🙈 `.gitignore` 설정
- [ ] 🎨 스타일링 적용
- [ ] 🔀 페이지 라우팅 추가
- [ ] 🧱 공통 컴포넌트 구성

---

## 🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000) 에서 실행됩니다.

---

## 💡 학습 포인트

- `create-next-app` 없이 Next.js 프로젝트를 손으로 직접 구성하는 방법
- **App Router** 구조 이해 (`layout.tsx` / `page.tsx` 역할 분리)
- `reactStrictMode` 와 Hydration의 관계
- TypeScript `paths` alias(`@/*`)를 활용한 절대 경로 임포트
