import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import type { InvestmentEntry } from '../lib/types'

export default function Investments() {
  const { session } = useAuth()
  const [entries, setEntries] = useState<InvestmentEntry[]>([])
  const [account, setAccount] = useState('NISA成長投資枠')
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [contribution, setContribution] = useState('')
  const [valuation, setValuation] = useState('')

  async function load() {
    const { data } = await supabase.from('investment_entries').select('*').order('entry_date', { ascending: true })
    setEntries(data ?? [])
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount pattern
    void load()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!session) return
    await supabase.from('investment_entries').insert({
      user_id: session.user.id,
      account,
      entry_date: entryDate,
      contribution: Number(contribution),
      valuation: valuation ? Number(valuation) : null,
    })
    setContribution('')
    setValuation('')
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('investment_entries').delete().eq('id', id)
    load()
  }

  const accounts = useMemo(() => Array.from(new Set(entries.map((e) => e.account))), [entries])

  const chartData = useMemo(() => {
    const byDate = new Map<string, Record<string, number>>()
    for (const e of entries) {
      if (!byDate.has(e.entry_date)) byDate.set(e.entry_date, {})
      byDate.get(e.entry_date)![e.account] = Number(e.valuation ?? e.contribution)
    }
    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({ date, ...vals }))
  }, [entries])

  const colors = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2']

  return (
    <div className="page">
      <h2>投資管理</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        <input placeholder="口座名（例: NISA成長投資枠）" value={account} onChange={(e) => setAccount(e.target.value)} required />
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
        <input type="number" placeholder="積立金額（累計）" value={contribution} onChange={(e) => setContribution(e.target.value)} required />
        <input type="number" placeholder="評価額（任意）" value={valuation} onChange={(e) => setValuation(e.target.value)} />
        <button type="submit">追加</button>
      </form>

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {accounts.map((acc, i) => (
              <Line key={acc} type="monotone" dataKey={acc} name={acc} stroke={colors[i % colors.length]} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>口座</th>
            <th>積立金額</th>
            <th>評価額</th>
            <th>差額</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries
            .slice()
            .reverse()
            .map((e) => (
              <tr key={e.id}>
                <td>{e.entry_date}</td>
                <td>{e.account}</td>
                <td>{Number(e.contribution).toLocaleString()}円</td>
                <td>{e.valuation != null ? `${Number(e.valuation).toLocaleString()}円` : '-'}</td>
                <td>{e.valuation != null ? `${(Number(e.valuation) - Number(e.contribution)).toLocaleString()}円` : '-'}</td>
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
