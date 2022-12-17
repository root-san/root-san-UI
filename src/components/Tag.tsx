interface Props {
  isOptional?: boolean
}

const Tag = ({ isOptional }: Props) => {
  return (
    <div
      className={`rounded px-1.5 py-0.5 ${
        isOptional ? 'bg-background-secondary' : 'bg-warning'
      }`}
    >
      <p className="text-xs text-white">{isOptional ? '任意' : '必須'}</p>
    </div>
  )
}

export default Tag
