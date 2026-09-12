import { hasAuthCookie, isProtectedPath, safeRedirectTarget } from './auth'

describe('isProtectedPath', () => {
  it('/dashboard로 시작하는 경로는 보호 대상이다', () => {
    expect(isProtectedPath('/dashboard')).toBe(true)
    expect(isProtectedPath('/dashboard/settings')).toBe(true)
  })

  it('보호 목록에 없는 경로는 통과시킨다', () => {
    expect(isProtectedPath('/login')).toBe(false)
    expect(isProtectedPath('/blog')).toBe(false)
    expect(isProtectedPath('/')).toBe(false)
  })
})

describe('hasAuthCookie', () => {
  it('auth-token이 있으면 true를 반환한다', () => {
    expect(hasAuthCookie('auth-token=demo-token')).toBe(true)
    expect(hasAuthCookie('theme=dark; auth-token=demo-token')).toBe(true)
  })

  it('auth-token이 없으면 false를 반환한다', () => {
    expect(hasAuthCookie('')).toBe(false)
    expect(hasAuthCookie('theme=dark')).toBe(false)
  })

  it('이름이 부분적으로만 겹치는 쿠키는 오탐하지 않는다', () => {
    expect(hasAuthCookie('my-auth-token=1')).toBe(false)
  })
})

describe('safeRedirectTarget', () => {
  it('내부 경로는 그대로 통과시킨다', () => {
    expect(safeRedirectTarget('/dashboard')).toBe('/dashboard')
    expect(safeRedirectTarget('/dashboard/settings')).toBe('/dashboard/settings')
  })

  it('외부로 나가는 주소는 막는다', () => {
    expect(safeRedirectTarget('https://evil.com')).toBeNull()
    // 프로토콜 상대 URL — 브라우저가 https://evil.com 으로 해석해요
    expect(safeRedirectTarget('//evil.com')).toBeNull()
  })

  it('문자열이 아니면 null을 반환한다', () => {
    expect(safeRedirectTarget(null)).toBeNull()
    expect(safeRedirectTarget(undefined)).toBeNull()
  })
})
