// TODO: ロジックを書く

const CalculateSummary = () => {
  return (
    <div className="divide-y bg-white py-3 px-5 rounded-xl">
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-600">グループの総額</p>
          <p className="font-bold text-gray-700">¥15,600</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-center text-gray-600">
            あなたの支払った額
          </p>
          <p className="font-bold text-gray-700">¥5,600</p>
        </div>
      </div>
      <div className="pt-3">
        <div className="flex justify-between text-xs">
          <p className="text-gray-500">きら</p>
          <p className="font-bold text-blue-500">+¥8,600</p>
        </div>
      </div>
    </div>
  )
}

export default CalculateSummary
