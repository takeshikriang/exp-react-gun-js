import { fireEvent, render, screen } from '@testing-library/react'
import { TasksList } from 'components'

const tasks = [
  {
    id: '01',
    title: 'aaa',
    createdAt: '1234'
  },
  {
    id: '02',
    title: 'bbb',
    createdAt: '1234'
  }
]

test('handles click event', () => {
  const mockFn = jest.fn()
  render(<TasksList tasks={tasks} deleteTask={mockFn} />)

  expect(screen.queryAllByTestId('item')).toHaveLength(2)

  fireEvent.click(screen.queryAllByTestId('button')[1])
  expect(mockFn).toHaveBeenCalledTimes(1)
  expect(mockFn).toHaveBeenCalledWith('02')

  mockFn.mockRestore()
})
