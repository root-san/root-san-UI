import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

interface HistoryContextType {
  history: string[]
}

const HistoryContext = createContext<HistoryContextType>({ history: ['', ''] })

export const useHistory = () => {
  return useContext(HistoryContext)
}

const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const [history, setHistory] = useState<string[]>(['', ''])

  useEffect(() => {
    setHistory((prev) => {
      if (location.pathname === prev[0]) return prev
      return [location.pathname, prev[0] ?? '']
    })
  }, [location.pathname])

  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  )
}

export default HistoryProvider
