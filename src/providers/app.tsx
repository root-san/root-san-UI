import React from 'react'
import { BrowserRouter } from 'react-router-dom'

interface AppProviderProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>{children}</BrowserRouter>
    </React.Suspense>
  )
}

export default AppProviders
