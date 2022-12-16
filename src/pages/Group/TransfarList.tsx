import TransfarCard from './TransfarCard'

const TransfarList = () => {
  return (
    <div className='flex flex-col gap-3'>
      <TransfarCard isPaid={true} />
      <TransfarCard isPaid={true} />
    </div>
  )
}

export default TransfarList
