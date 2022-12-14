import { Noto_Sans_JP } from '@next/font/google'

const NotoSansJP_Bold = Noto_Sans_JP({
  weight: '700',
  subsets: ['japanese'],
})

interface Props {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header = ({ title, left, right }: Props) => {
  return (
    <header className="grid h-12 w-full grid-cols-[32px_1fr_32px] items-center justify-items-center py-2 px-6">
      <div>{left}</div>
      <div className={NotoSansJP_Bold.className + ' text-lg'}>{title}</div>
      <div>{right}</div>
    </header>
  )
}

export default Header
