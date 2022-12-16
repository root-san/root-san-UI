// TODO: UIだけ作る

interface Props {
  isPaid: boolean
}

const TransfarCard = ({ isPaid }: Props) => {
  return (
    <div className='w-full p-5 rounded-xl bg-white text-center'>
      <p className='text-gray-500 mb-0.5'>きら→たら</p>
      <p className='text-gray-700 text-[32px]'>¥2,500</p>
      <button
        className={
          'w-full h-10 mt-4 bg-gray-700  font-bold text-center text-white text-sm leading-10 rounded-lg ' +
          'hover:bg-gray-900 active:bg-gray-900 disabled:bg-gray-400 disabled:text-gray-200'
        }
        disabled={isPaid}
      >
        支払い済みにする
      </button>
    </div>
  )
}

export default TransfarCard
