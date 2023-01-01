interface Props {
  src: string
  alt?: string
  className?: string
  title: string
}

const TitleImage = ({ src, alt, className, title }: Props) => {
  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      <img
        src={src}
        alt={alt ?? ''}
        className="h-[200px]"
        width="200"
        height="200"
      />
      <p className="font-semibold text-sm text-center">{title}</p>
    </div>
  )
}

export default TitleImage
