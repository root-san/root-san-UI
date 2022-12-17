import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { localStorageProvider } from './localStorageProvider'
import HistoryProvider from './HistoryProvider'

interface AppProviderProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <BrowserRouter>
          <HistoryProvider>{children}</HistoryProvider>
        </BrowserRouter>
      </SWRConfig>
    </React.Suspense>
  )
}

export default AppProviders
