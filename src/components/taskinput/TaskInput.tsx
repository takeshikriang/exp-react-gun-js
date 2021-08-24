import { memo, SyntheticEvent, useRef, useState } from 'react'
import { TextInput } from 'components/inputs'

interface TaskInputProps {
  createTask: (title: string) => void
}

function TaskInput({ createTask }: TaskInputProps) {
  const [title, setTitle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    if (!title) {
      setErrorMessage('This field is required!')
    } else {
      createTask(title)

      if (inputRef.current !== null) {
        inputRef.current.value = ''
        inputRef.current.blur()
      }

      setTitle('')
      setErrorMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start">
        <div className="mr-4">
          <TextInput
            ref={inputRef}
            name={'title'}
            type={'text'}
            inputValue={(value: string) => setTitle(value)}
            errorMessage={errorMessage}
            placeholder="What you want to focus?"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-green-600 border border-green-600 hover:bg-green-700 hover:border-green-700 text-white font-semibold rounded transition-colors duration-300 ease-in-out"
          data-testid="button"
        >
          Create Task
        </button>
      </div>
    </form>
  )
}

export default memo(TaskInput)
