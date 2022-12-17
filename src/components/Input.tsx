import React, { useId } from 'react'

interface Props {
  title?: string
  type: 'text' | 'number' | 'date'
  value: string
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ title, type, value, disabled, onChange }: Props) => {
  const id = useId()
  return (
    <div>
      {title && (
        <label htmlFor={id} className="block mb-3">
          <span className="text-base font-bold">{title}</span>
        </label>
      )}
      <input
        id={id}
        type={type}
        className="rounded-lg block w-full text-base py-3 px-4 outline-none"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
