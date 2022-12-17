import Input from '/@/components/Input'
import Button from '/@/components/Button'

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
        <Button text="-" onClick={onMinus} disabled={value <= 1} className="text-xs w-auto absolute bottom-1 left-1" />
        <Button text="+" onClick={onPlus} className="text-xs w-auto absolute bottom-1 right-1" />
      </Input>
    </div>
  )
}

export default CountInput
