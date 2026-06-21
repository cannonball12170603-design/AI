import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import type { SpecialExpense } from '../lib/types'

export default function SpecialExpenses() {
  const { session } = useAuth()
  const [entries, setEntries] = useState<SpecialExpense[]>([])
  const [expenseDate, setExpenseDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')

  async function load() {
    const { data } = await supabase.from('special_expenses').select('*').order('expense_date', { ascending: false })
    setEntries(data ?? [])
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount pattern
    void load()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!session) return
    await supabase.from('special_expenses').insert({
      user_id: session.user.id,
      expense_date: expenseDate,
      item,
      amount: Number(amount),
      memo: memo || null,
    })
    setItem('')
    setAmount('')
    setMemo('')
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('special_expenses').delete().eq('id', id)
    load()
  }

  const total = entries.reduce((sum, e) => sum + Number(e.amount), 0)

  return (
    <div className="page">
      <h2>特別出費（買い物明細）</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        <input type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} required />
        <input placeholder="購入先・品物" value={item} onChange={(e) => setItem(e.target.value)} required />
        <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input placeholder="メモ（任意）" value={memo} onChange={(e) => setMemo(e.target.value)} />
        <button type="submit">追加</button>
      </form>

      <p>合計: {total.toLocaleString()}円</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>購入先・品物</th>
            <th>金額</th>
            <th>メモ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.expense_date}</td>
              <td>{e.item}</td>
              <td>{Number(e.amount).toLocaleString()}円</td>
              <td>{e.memo}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
