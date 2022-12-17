export interface OncePayTxn {
  id: string
  name: string
  amount: number
  isPaid: boolean
}

export interface OncePay {
  id: string
  name: string
  amount: number
  /** format: date */
  createdAt: string
  txns: OncePayTxn[]
}
