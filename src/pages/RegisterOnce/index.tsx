import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { useOncePayStore } from '/@/hooks/useOncePayStore'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import CountInput from './CountInput'
import { OncePayTxn } from '/@/types/OncePay'

const RegisterOnce = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [count, setCount] = useState(2)
  const { addOncePay } = useOncePayStore()

  const submit = async () => {
    const id = uuidv4()
    const txns: OncePayTxn[] = []
    const remainder = Number(amount) % count
    const basePay = Math.floor(Number(amount) / count)
    for (let i = 0; i < count; i++) {
      txns.push({
        id: uuidv4(),
        name: 'hoge',
        amount: basePay + (i < remainder ? 1 : 0),
        isPaid: false,
      })
    }
    await addOncePay({
      id,
      name,
      amount: Number(amount),
      createdAt: new Date().toString(),
      txns,
    })
    navigate(`/once/${id}`)
  }

  return (
    <PageContainer>
      <Header
        title="一度きり"
        left={
          <MdArrowBackIosNew
            onClick={() => {
              navigate('/register')
            }}
          />
        }
      />
      <div className='flex flex-col items-center w-full p-5'>
        <div className='flex flex-col gap-y-6 w-full'>
          <div className="form-control w-full flex flex-col gap-y-3">
            <Input
              title="名目"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control w-full flex flex-col gap-y-3">
            <Input
              title="金額"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-control w-full flex flex-col gap-y-3">
            <CountInput
              title="人数"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              onMinus={() => setCount(count - 1)}
              onPlus={() => setCount(count + 1)}
            />
          </div>
        </div>
        <div className="h-[108px]" />
      </div>
      <div className="flex flex-col items-center gap-3 w-full fixed bottom-0 px-5 pt-5 pb-10 bg-white">
        <Button text="割り勘する" onClick={submit} />
      </div>
    </PageContainer>
  )
}

export default RegisterOnce
