import { describe, expect, it }	from 'vitest'
import { fireEvent, render }   	from 'solid-testing-library'
import Logo                    	from '../Logo'

describe('Logo Component', () => {
  test('should render', () => {
    const { container, unmount } = render(() => <Logo/>)
    expect(container.innerHTML).toBeTruthy()
    unmount()
  })
})
