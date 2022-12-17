import React from 'react'

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative w-full'>
      <div className="mx-auto w-full max-w-3xl h-full absolute">{children}</div>
    </div>
  )
}

export default PageContainer
