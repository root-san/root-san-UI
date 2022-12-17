interface Props {
  text: string
  disabled?: boolean
  onClick: () => void
  white?: boolean
  warn?: boolean
}

const Button = ({ text, onClick, disabled, white, warn }: Props) => {
  return (
    <button
      className={`
        rounded-lg block w-full text-base py-3 px-4 outline-none bg-primary text-secondary font-bold 
        disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed
        hover:bg-gray-900 transition duration-200 ease-in-out
        active:bg-gray-900 ${white ? 'bg-white text-primary' : ''} ${
        warn ? 'bg-red-50 text-red-500' : ''
      }
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
