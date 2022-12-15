import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import Help from '/@/pages/Help'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  )
}

export default AppRoutes
