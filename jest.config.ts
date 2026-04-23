// nextJest? - Next.js가 제공하는 Jest 설정 헬퍼예요. TypeScript, JSX 변환, Next.js 전용 설정을 자동으로 잡아줘요.
import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',

  // Node.js 환경에서 브라우저 DOM을 흉내내요. document, window 같은 브라우저 API를 쓸 수 있게 돼요.
  testEnvironment: 'jsdom',

  // 각 테스트 파일 실행 전에 먼저 실행할 파일이에요.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // @/ 경로 alias를 Jest가 이해할 수 있게 해줘요. tsconfig.json의 paths 설정과 일치해야 해요.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);