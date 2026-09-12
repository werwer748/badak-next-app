import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { toggleAuth } from '@/app/actions/auth'
import AuthToggle from './AuthToggle'

jest.mock('next/navigation')
jest.mock('@/app/actions/auth')

const mockedUsePathname = jest.mocked(usePathname)
const mockedToggleAuth = jest.mocked(toggleAuth)

function setCookie(value: string) {
  document.cookie = value
}

function clearCookies() {
  document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

describe('AuthToggle 컴포넌트', () => {
  beforeEach(() => {
    clearCookies()
    mockedUsePathname.mockReturnValue('/dashboard')
    mockedToggleAuth.mockResolvedValue({ message: '', loggedIn: true })
  })

  afterEach(() => {
    clearCookies()
    jest.resetAllMocks()
  })

  it('쿠키가 없으면 "로그인 처리"로 보인다', async () => {
    render(<AuthToggle />)

    expect(await screen.findByRole('button', { name: '로그인 처리' })).toBeInTheDocument()
  })

  it('auth-token 쿠키가 있으면 "로그아웃 처리"로 보인다', async () => {
    setCookie('auth-token=demo-token')
    render(<AuthToggle />)

    expect(await screen.findByRole('button', { name: '로그아웃 처리' })).toBeInTheDocument()
  })

  it('현재 경로를 hidden input으로 함께 보낸다', async () => {
    render(<AuthToggle />)
    await screen.findByRole('button')

    const path = document.querySelector('input[name="path"]')
    expect(path).toHaveValue('/dashboard')
  })

  it('버튼을 누르면 서버 액션이 호출된다', async () => {
    const user = userEvent.setup()
    render(<AuthToggle />)

    await user.click(await screen.findByRole('button'))

    expect(mockedToggleAuth).toHaveBeenCalled()
  })
})
