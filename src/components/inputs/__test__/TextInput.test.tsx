import { fireEvent, render, screen } from '@testing-library/react'
import { TextInput } from 'components/inputs'

test('renders props', () => {
  render(<TextInput id={'title'} name={'title'} type={'text'} />)

  const input = screen.queryByTestId('input')

  expect(input).toHaveAttribute('id', 'title')
  expect(input).toHaveAttribute('name', 'title')
  expect(input).toHaveAttribute('type', 'text')
})

test('renders error message', () => {
  const { rerender } = render(<TextInput errorMessage={''} />)

  expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

  rerender(<TextInput errorMessage={'lorem ipsum'} />)

  const message = screen.queryByTestId('error-message')
  expect(message).toBeInTheDocument()
  expect(message).toHaveTextContent(/^lorem ipsum$/)
})

test('handles input value', () => {
  const mockFn = jest.fn()
  render(<TextInput inputValue={mockFn} />)

  const input = screen.queryByTestId('input')

  fireEvent.change(input!, { target: { value: 'lorem ipsum' } })
  expect(mockFn).toHaveBeenCalledTimes(1)
  expect(mockFn).toHaveBeenCalledWith('lorem ipsum')
  expect(input).toHaveDisplayValue('lorem ipsum')

  mockFn.mockRestore()
})
