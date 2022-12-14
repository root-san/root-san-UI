'use client'
import 'styles/global.scss'
import { Noto_Sans_JP } from '@next/font/google'

const NotoSansJP_regular = Noto_Sans_JP({
  weight: '400',
  subsets: ['japanese'],
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body className={NotoSansJP_regular.className}>
        <div className="mx-auto max-w-5xl">{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
