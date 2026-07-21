import { render, screen } from '@testing-library/react'
import { StudyNote } from './StudyNote'

describe('StudyNote 컴포넌트', () => {
  it('study-routes.ts에 있는 id면 whatIsIt/whereUsed/concepts를 렌더링한다', () => {
    render(<StudyNote id="counter" />)

    expect(screen.getByText('라우팅 기초')).toBeInTheDocument()
    expect(screen.getByText(/Server Component에 useState를 쓰면/)).toBeInTheDocument()
  })

  it('study-routes.ts에 없는 id면 에러를 던진다', () => {
    expect(() => render(<StudyNote id="존재하지-않는-id" />)).toThrow()
  })
})
