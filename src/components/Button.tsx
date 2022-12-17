interface Props {
  text: string
  disabled?: boolean
  onClick: () => void
  white?: boolean
  warn?: boolean
  className?: string
}

const Button = ({ text, onClick, disabled, white, warn, className }: Props) => {
  return (
    <button
      className={`
        rounded-lg block w-full text-base py-3 px-4 outline-none bg-primary text-secondary font-bold
        disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed
        hover:bg-primary-hover transition duration-200 ease-in-out
        active:bg-primary-hover ${white ? 'bg-white text-primary' : ''} ${
        warn ? 'bg-red-50 text-red-500' : ''
      } ${className ?? ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
