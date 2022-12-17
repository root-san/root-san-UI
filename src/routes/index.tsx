import { useRoutes, useLocation } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import Group from '/@/pages/Group'
import GroupPay from '/@/pages/GroupPay'
import Help from '/@/pages/Help'
import Join from '/@/pages/Join'
import { AnimatePresence } from 'framer-motion'
import { cloneElement } from 'react'

const AppRoutes = () => {
  const element = useRoutes([
    { path: '/', element: <Top /> },
    { path: '/register', element: <Register /> },
    { path: '/group/:roomId', element: <Group /> },
    { path: '/group/:roomId/add_pay', element: <GroupPay /> },
    { path: '/help', element: <Help /> },
    { path: '/join/:roomId', element: <Join /> },
  ])

  const location = useLocation()
  if (!element) return null

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  )
}

export default AppRoutes
