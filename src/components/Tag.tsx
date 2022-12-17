interface Props {
  isOptional?: boolean
}

const Tag = ({ isOptional }: Props) => {
  return (
    <div
      className={`rounded px-[6px] py-[2px] ${
        isOptional ? 'bg-background-secondary' : 'bg-warning'
      }`}
    >
      <div className="text-base text-white">{isOptional ? '任意' : '必須'}</div>
    </div>
  )
}

export default Tag
