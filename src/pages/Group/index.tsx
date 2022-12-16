import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import { useRoom } from '/@/hooks/useRoom'

import Expence from './Expence'
import Calculate from './Calculate'

const Group = () => {
  const { roomId } = useParams()
  const [isCalculate, setIsCalculate] = useState(false)
  if (!roomId) {
    // TODO: 404
    return <div>Room ID is not found</div>
  }

  const { room } = useRoom(roomId)
  if (room === undefined) {
    return <div>Loading...</div>
  }

  return (
    <PageContainer>
      <Header title={room?.name} />
      <div className="p-5">
        <div className='flex font-semibold h-[42px] mb-6'>
          <button
            onClick={() => setIsCalculate(false)}
            className={`w-full border-b-2 ${
              !isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            出費
          </button>
          <button
            onClick={() => setIsCalculate(true)}
            className={`w-full border-b-2 ${
              isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            精算
          </button>
        </div>
        {!isCalculate ? <Expence room={room} /> : <Calculate />}
      </div>
    </PageContainer>
  )
}

export default Group
