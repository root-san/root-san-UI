import { motion } from 'framer-motion'
import { useHistory } from '/@/providers/HistoryProvider'
import { useAnimateSetting } from '/@/hooks/useAnimateSetting'
interface Props {
  children: React.ReactNode
}

const animateDirection = (before: number[], current: number[]) => {
  if (before[1] > current[1]) {
    // Up
    return { y: '-100%' }
  } else if (before[1] < current[1]) {
    // Down
    return { y: '100%' }
  }

  if (before[0] > current[0]) {
    // Left
    return { x: '100%' }
  }
  // Right
  return { x: '-100%' }
}

const AnimateBody = ({ children }: Props) => {
  const { pageDuration, pathToPageLevel } = useAnimateSetting()
  const { history } = useHistory()
  const before = pathToPageLevel(history[1])
  const current = pathToPageLevel(history[0])

  return (
    <motion.div
      initial={animateDirection(before, current)}
      animate={{ x: '0%', y: '0%' }}
      exit={animateDirection(before, current)}
      transition={{ duration: pageDuration }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateBody
