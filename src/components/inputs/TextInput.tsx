import { ChangeEvent, forwardRef } from 'react'

export type TextInputProps = {
  name: string
  type: string
  errorMessage?: string
  extraClassName?: string
  [x: string]: any
  inputValue: (value: string) => void
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, type, errorMessage, extraClassName, inputValue, ...rest }, ref) => {
    const defaultClassName = 'block w-full py-2 px-3 rounded border'
    const errorClassName = errorMessage ? 'border-red-700' : ''

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      inputValue(event.target.value.trim())
    }

    return (
      <>
        <input
          ref={ref}
          data-testid="input"
          id={name}
          name={name}
          type={type}
          className={[defaultClassName, extraClassName, errorClassName].join(
            ' '
          )}
          onChange={handleChange}
          {...rest}
        />

        {errorMessage && (
          <span
            className="block mt-1 text-sm text-red-500"
            data-testid="error-message"
          >
            {errorMessage}
          </span>
        )}
      </>
    )
  }
)

export default TextInput
