interface DividerProps {
  text?: string
}

const Divider = ({ text }: DividerProps) => {
  return (
    <>
      {text !== undefined ? (
        <div
          className={
            "before:content-[''] before:h-px before:grow before:bg-gray-500 before:mr-2 " +
            "after:content-[''] after:h-px after:grow after:bg-gray-500 after:ml-2 w-full flex items-center text-gray-500"
          }
        >
          {text}
        </div>
      ) : (
        <div className="w-full bg-gray-500 h-px" />
      )}
    </>
  )
}

export default Divider
