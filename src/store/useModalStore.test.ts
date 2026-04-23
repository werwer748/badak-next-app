import { act, renderHook } from '@testing-library/react'
import { useModalStore } from './useModalStore'

describe('useModalStore', () => {
  beforeEach(() => {
    useModalStore.setState({
      isOpen: false,
      title: '',
      content: '',
    })
  })

  it('초기 상태가 올바르다', () => {
    const { result } = renderHook(() => useModalStore())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.title).toBe('')
    expect(result.current.content).toBe('')
  })

  it('open 호출하면 모달이 열린다', () => {
    const { result } = renderHook(() => useModalStore())

    act(() => {
      result.current.open('테스트 제목', '테스트 내용')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.title).toBe('테스트 제목')
    expect(result.current.content).toBe('테스트 내용')
  })

  it('close 호출하면 모달이 닫힌다', () => {
    const { result } = renderHook(() => useModalStore())

    act(() => {
      result.current.open('제목', '내용')
    })
    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
    expect(result.current.title).toBe('')
    expect(result.current.content).toBe('')
  })
})