import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import Help from '/@/pages/Help'
import GroupPay from '/@/pages/GroupPay'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/group/:roomId/add_pay" element={<GroupPay />} />
    </Routes>
  )
}

export default AppRoutes
