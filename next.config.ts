import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /*
    React의 엄격 모드 - 컴포넌트를 의도적으로 두 번 렌더링(두 번 렌더링해도 결과가 같아야 한다는 걸 검증)
    Hydration이랑 직결된다.
    서버에서 한 번, 클라이언트에서 한 번 렌더링했을 때 결과가 달라지면 Strict Mode가 바로 잡아준다.
  */
  reactStrictMode: true,
}

export default nextConfig