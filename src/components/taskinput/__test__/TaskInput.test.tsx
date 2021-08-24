import { fireEvent, render, screen } from '@testing-library/react'
import { TaskInput } from 'components'

test('handles submit event', () => {
  const mockFn = jest.fn()
  render(<TaskInput createTask={mockFn} />)

  fireEvent.change(screen.queryByTestId('input')!, {
    target: { value: 'lorem ipsum' }
  })
  fireEvent.click(screen.queryByTestId('button')!)
  expect(mockFn).toHaveBeenCalledTimes(1)
  expect(mockFn).toHaveBeenCalledWith('lorem ipsum')

  mockFn.mockRestore()
})
