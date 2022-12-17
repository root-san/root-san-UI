import { motion } from 'framer-motion'
import { useAnimateSetting } from '/@/hooks/useAnimateSetting'

interface Props {
  children: React.ReactNode
  back?: boolean // 戻る方向のアニメーション
}

const AnimateBody = ({ children, back }: Props) => {
  const { pageDuration } = useAnimateSetting()
  return (
    <motion.div
      initial={back ? { x: '-100%' } : { x: '100%' }}
      animate={{ x: '0%' }}
      exit={back ? { x: '100%' } : { x: '-100%' }}
      transition={{ duration: pageDuration }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateBody
