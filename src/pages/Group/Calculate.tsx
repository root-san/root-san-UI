import TransfarList from './TransfarList'
import CalculateSummary from './CalculateSummary'

// とりあえずUIだけ作ることにした

const Calculate = () => {
  return (
    <div className='space-y-6'>
      <CalculateSummary />
      <TransfarList />
    </div>
  )
}

export default Calculate
