import { Link } from 'react-router-dom'
import people from '/@/assets/people.png'

const Empty = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <img src={people} alt="" className='h-[200px]' width="200" height="200" />
      <p className='font-semibold text-lg'>利用中のグループはありません</p>
      <Link
        to="/register"
        className="w-64 h-10 bg-gray-700 hover:bg-gray-900 active:bg-gray-900 font-bold text-center text-white leading-10 rounded-lg px-4 mt-8"
      >
        グループを作る
      </Link>
    </div>
  )
}

export default Empty
