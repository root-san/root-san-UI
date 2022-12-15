import React from 'react'

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto w-full max-w-3xl h-full">{children}</div>
}

export default PageContainer
