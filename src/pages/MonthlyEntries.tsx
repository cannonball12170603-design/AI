import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import type { MonthlyEntry } from '../lib/types'

export default function MonthlyEntries() {
  const { session } = useAuth()
  const [entries, setEntries] = useState<MonthlyEntry[]>([])
  const [yearMonth, setYearMonth] = useState(() => new Date().toISOString().slice(0, 7))
  const [category, setCategory] = useState('')
  const [kind, setKind] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')

  async function load() {
    const { data } = await supabase.from('monthly_entries').select('*').order('year_month', { ascending: false })
    setEntries(data ?? [])
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount pattern
    void load()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!session) return
    await supabase.from('monthly_entries').insert({
      user_id: session.user.id,
      year_month: `${yearMonth}-01`,
      category,
      kind,
      amount: Number(amount),
    })
    setCategory('')
    setAmount('')
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('monthly_entries').delete().eq('id', id)
    load()
  }

  return (
    <div className="page">
      <h2>収支入力</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        <input type="month" value={yearMonth} onChange={(e) => setYearMonth(e.target.value)} required />
        <input placeholder="項目（例: 給料, 電気代）" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <select value={kind} onChange={(e) => setKind(e.target.value as 'income' | 'expense')}>
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
        <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">追加</button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>月</th>
            <th>項目</th>
            <th>区分</th>
            <th>金額</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.year_month.slice(0, 7)}</td>
              <td>{e.category}</td>
              <td>{e.kind === 'income' ? '収入' : '支出'}</td>
              <td>{Number(e.amount).toLocaleString()}円</td>
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
