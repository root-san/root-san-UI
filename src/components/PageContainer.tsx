import React from 'react'

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-3xl h-full absolute top-0 inset-x-0 overflow-x-hidden">
      {children}
    </div>
  )
}

export default PageContainer
