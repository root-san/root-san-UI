import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import RegisterOncePay from '/@/pages/RegisterOncePay'
import Group from '/@/pages/Group'
import GroupPay from '/@/pages/GroupPay'
import OncePay from '/@/pages/OncePay'
import Help from '/@/pages/Help'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/once_pay" element={<RegisterOncePay />} />
      <Route path="/group/:roomId" element={<Group />} />
      <Route path="/group/:roomId/add_pay" element={<GroupPay />} />
      <Route path="/once_pay/:id" element={<OncePay />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  )
}

export default AppRoutes
