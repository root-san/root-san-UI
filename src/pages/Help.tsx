import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Help = () => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%', opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.5 }}
    >
      <h1>Help</h1>
      <Link to="/">Home</Link>
    </motion.div>
  )
}

export default Help
