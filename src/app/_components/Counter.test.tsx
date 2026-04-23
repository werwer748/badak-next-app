import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter 컴포넌트', () => {
  it('초기 카운트가 0으로 렌더링된다', () => {
    render(<Counter />)
    expect(screen.getByText('클릭 횟수: 0')).toBeInTheDocument()
  })

  it('버튼 클릭하면 카운트가 1 증가한다', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('클릭 횟수: 1')).toBeInTheDocument()
  })

  it('버튼 3번 클릭하면 카운트가 3이 된다', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const button = screen.getByRole('button')
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(screen.getByText('클릭 횟수: 3')).toBeInTheDocument()
  })
})