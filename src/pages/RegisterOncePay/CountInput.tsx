import Input from '/@/components/Input'
import Button from '/@/components/Button'
import plus from '/@/assets/plus.svg'
import minus from '/@/assets/minus.svg'

interface Props {
  title: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPlus: () => void
  onMinus: () => void
}

const CountInput = ({ title, value, onChange, onPlus, onMinus }: Props) => {
  return (
    <div className="relative">
      <Input
        title={title}
        type="number"
        value={`${value}`}
        onChange={onChange}
        className="text-center"
      >
        <Button
          text={<img src={minus} alt="" className=''/>}
          onClick={onMinus}
          disabled={value <= 1}
          className="text-xs w-auto absolute bottom-1 left-1 px-1 py-1 bg-gray-700 text-white hover:bg-gray-900 active:bg-gray-900"
        />
        <Button
          text="+"
          onClick={onPlus}
          className="text-xs w-auto absolute bottom-1 right-1 bg-gray-700 text-white hover:bg-gray-900 active:bg-gray-900"
        />
      </Input>
    </div>
  )
}

export default CountInput
