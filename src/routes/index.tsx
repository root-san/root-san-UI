import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import RegisterOnce from '/@/pages/RegisterOnce'
import Group from '/@/pages/Group'
import GroupPay from '/@/pages/GroupPay'
import Help from '/@/pages/Help'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/once" element={<RegisterOnce />} />
      <Route path="/group/:roomId" element={<Group />} />
      <Route path="/group/:roomId/add_pay" element={<GroupPay />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  )
}

export default AppRoutes
