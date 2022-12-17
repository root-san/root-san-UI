import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '/@/pages/Register'
import Group from '/@/pages/Group'
import GroupPay from '/@/pages/GroupPay'
import Help from '/@/pages/Help'
import Join from '/@/pages/Join'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
      <Route path="/group/:roomId" element={<Group />} />
      <Route path="/group/:roomId/add_pay" element={<GroupPay />} />
      <Route path="/help" element={<Help />} />
      <Route path="/join/:roomId" element={<Join />} />
    </Routes>
  )
}

export default AppRoutes
