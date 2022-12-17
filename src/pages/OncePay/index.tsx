import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'

import { useOncePayStore } from '/@/hooks/useOncePayStore'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import Input from '/@/components/Input'
import Button from '/@/components/Button'

const OncePay = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, updateOncePay } = useOncePayStore()
  const oncePay = data?.find((v) => v.id === id)
  /** id をキー, 支払ったかを値に持つ */
  const [isPaid, setIsPaid] = useState<Record<string, boolean>>({})
  /** id をキー, 名前を値に持つ */
  const [names, setNames] = useState<Record<string, string>>({})

  if (!oncePay) {
    // TODO: 404
    return <div>Room ID is not found</div>
  }

  useEffect(() => {
    setIsPaid(
      Object.fromEntries(oncePay.txns.map((txn) => [txn.id, txn.isPaid]))
    )
    setNames(Object.fromEntries(oncePay.txns.map((txn) => [txn.id, txn.name])))
  }, [])

  const submit = () => {
    console.log('submit')
  }

  return (
    <PageContainer>
      <Header
        title={oncePay.name}
        left={
          <MdArrowBackIosNew
            onClick={() => {
              navigate('/')
            }}
          />
        }
      />
      <div className='flex flex-col items-center gap-3 w-full p-5'>
        {oncePay.txns.map((txn) => (
          <div key={txn.id} className="w-full flex flex-row items-center bg-white gap-6 px-5 py-4">
            <div className="w-full flex flex-row items-center gap-6">
              <Input
                type="text"
                value={names[txn.id]}
                onChange={(e) => {
                  const newData = { ...names }
                  newData[txn.id] = e.target.value
                  setNames(newData)
                }}
                className="text-base font-semibold flex-1 bg-background"
              />
              <div className="text-2xl font-bold">&yen;{txn.amount}</div>
            </div>
            <input
              type="checkbox"
              checked={isPaid[txn.id]}
              onChange={(e) => {
                const newData = { ...isPaid }
                newData[txn.id] = e.target.checked
                setIsPaid(newData)
              }}
              className="w-5 h-5"
            />
          </div>
        ))}
        <div className="h-[108px]" />
      </div>
      <div className="flex flex-col items-center gap-3 w-full fixed bottom-0 px-5 pt-5 pb-10 bg-white">
        <Button text="完了" onClick={submit} />
      </div>
    </PageContainer>
  )
}

export default OncePay
