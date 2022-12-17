import { motion } from 'framer-motion'
import { useAnimateSetting } from '/@/hooks/useAnimateSetting'

interface Props {
  children: React.ReactNode
}

const AnimateBody = ({ children }: Props) => {
  const { pageDuration } = useAnimateSetting()
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '100%' }}
      transition={{ duration: pageDuration }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateBody
