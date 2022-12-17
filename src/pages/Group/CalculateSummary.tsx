interface Move {
  payer: string
  amount: number
}

interface Props {
  total: number
  paid: number
  results: Move[]
}

const CalculateSummary = ({ total, paid, results }: Props) => {
  return (
    <div className="divide-y bg-white py-3 px-5 rounded-xl">
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">グループの総額</p>
          <p className="font-bold text-gray-700">
            ¥{total.toLocaleString('ja-JP')}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-center text-gray-600">
            あなたの支払った額
          </p>
          <p className="font-bold text-gray-700">
            ¥{paid.toLocaleString('ja-JP')}
          </p>
        </div>
      </div>
      <div className="pt-3">
        {results.map((move) => (
          <div className="flex justify-between text-sm" key={move.payer}>
            <p className="text-gray-500">{move.payer}</p>
            <p
              className={`font-bold + ${
                move.amount >= 0 ? ' text-blue-500' : ' text-red-500'
              }`}
            >{`${move.amount >= 0 ? '+' : '-'}¥${move.amount.toLocaleString(
              'ja-JP'
            )}`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalculateSummary
