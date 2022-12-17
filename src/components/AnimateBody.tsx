import { motion } from 'framer-motion'
import { useAnimateSetting } from '/@/hooks/useAnimateSetting'
import { UNSAFE_RouteContext, useLocation } from 'react-router-dom'
import { useContext, useRef } from 'react'
interface Props {
  children: React.ReactNode
}

type Direction = 'Up' | 'Down' | 'Left' | 'Right'

const animateDirection = (before: number[], current: number[]): Direction => {
  if (before[1] > current[1]) {
    // Up
    return 'Up'
  } else if (before[1] < current[1]) {
    // Down
    return 'Down'
  }

  if (before[0] > current[0]) {
    // Left
    return 'Left'
  }
  // Right
  return 'Right'
}

const dirToPos = (dir: Direction | null): { x: string; y: string }[] => {
  if (dir === null)
    return [
      { x: '0%', y: '0%' },
      { x: '0%', y: '0%' },
    ]
  switch (dir) {
    case 'Up':
      return [
        { x: '0%', y: '-100%' },
        { x: '0%', y: '100%' },
      ]
    case 'Down':
      return [
        { x: '0%', y: '100%' },
        { x: '0%', y: '-100%' },
      ]
    case 'Right':
      return [
        { x: '100%', y: '0%' },
        { x: '-100%', y: '0%' },
      ]
    case 'Left':
      return [
        { x: '-100%', y: '0%' },
        { x: '100%', y: '0%' },
      ]
    default:
      return [
        { x: '0%', y: '0%' },
        { x: '0%', y: '0%' },
      ]
  }
}

const AnimateBody = ({ children }: Props) => {
  const { pageDuration, pathToPageLevel } = useAnimateSetting()
  const location = useLocation()
  const nextPath = location.pathname
  // HACK: localStorageじゃない方法で対応したい
  const prevPath = useRef<string | null>(window.localStorage.getItem('path'))
  const direction = useRef<Direction | null>(
    window.localStorage.getItem('direction') as Direction
  )
  if (prevPath.current && prevPath.current !== nextPath) {
    const prevIndex = pathToPageLevel(prevPath.current)
    const nextIndex = pathToPageLevel(nextPath)
    direction.current = animateDirection(prevIndex, nextIndex)
    window.localStorage.setItem('direction', direction.current)
  }

  window.localStorage.setItem('path', nextPath)
  prevPath.current = nextPath

  return (
    <motion.div
      initial={dirToPos(direction.current)[0]}
      animate={{ x: '0%', y: '0%' }}
      exit={dirToPos(direction.current)[1]}
      transition={{ duration: pageDuration }}
      className="min-h-[calc(100%-48px)] bg-background"
    >
      {children}
    </motion.div>
  )
}

export default AnimateBody
