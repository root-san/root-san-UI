import React, { useId } from 'react'

import { Member } from '/@/libs/apis'

interface Props {
  title?: string
  value: string
  options: Member[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ title, value, options, onChange }: Props) => {
  const id = useId()
  return (
    <div>
      {title && (
        <label htmlFor={id} className="block mb-3">
          <span className="text-base font-bold">{title}</span>
        </label>
      )}
      <select
        id={id}
        className="rounded-lg block w-full text-base py-3 px-4 outline-none"
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
