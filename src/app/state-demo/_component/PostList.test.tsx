import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useModalStore } from '@/store/useModalStore'
import PostList from './PostList'

const mockPosts = [
  { id: 1, title: '테스트 포스트 1', body: '내용 1' },
  { id: 2, title: '테스트 포스트 2', body: '내용 2' },
]

jest.mock('@/store/useModalStore')

const mockedUseModalStore = jest.mocked(useModalStore)

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('PostList 컴포넌트', () => {
  const mockOpen = jest.fn()

  beforeEach(() => {
    mockedUseModalStore.mockReturnValue({
      open: mockOpen,
    } as any)

    global.fetch = jest.fn()
    mockOpen.mockClear()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetch 중에 "백그라운드 업데이트 중..." 이 보인다', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )

    render(<PostList />, { wrapper: createWrapper() })

    expect(screen.getByText('백그라운드 업데이트 중...')).toBeInTheDocument()
  })

  it('데이터 로드 후 포스트 목록이 렌더링된다', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    })

    render(<PostList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('테스트 포스트 1')).toBeInTheDocument()
      expect(screen.getByText('테스트 포스트 2')).toBeInTheDocument()
    })
  })

  it('fetch 완료 후 "최신 데이터" 가 보인다', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    })

    render(<PostList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('최신 데이터')).toBeInTheDocument()
    })
  })

  it('포스트 클릭하면 open이 올바른 인자로 호출된다', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    })

    render(<PostList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('테스트 포스트 1')).toBeInTheDocument()
    })

    await user.click(screen.getByText('테스트 포스트 1'))

    expect(mockOpen).toHaveBeenCalledWith('테스트 포스트 1', '내용 1')
  })
})