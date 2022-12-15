import { Routes, Route } from 'react-router-dom'

import Top from '/@/pages/Top'
import Register from '../pages/register'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
