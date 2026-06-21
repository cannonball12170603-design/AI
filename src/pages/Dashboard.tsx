import { useEffect, useMemo, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { supabase } from '../lib/supabase'
import type { MonthlyEntry } from '../lib/types'

export default function Dashboard() {
  const [entries, setEntries] = useState<MonthlyEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('monthly_entries')
      .select('*')
      .order('year_month', { ascending: true })
      .then(({ data }) => {
        setEntries(data ?? [])
        setLoading(false)
      })
  }, [])

  const chartData = useMemo(() => {
    const byMonth = new Map<string, { month: string; income: number; expense: number; balance: number }>()
    for (const e of entries) {
      const key = e.year_month.slice(0, 7)
      if (!byMonth.has(key)) byMonth.set(key, { month: key, income: 0, expense: 0, balance: 0 })
      const row = byMonth.get(key)!
      if (e.kind === 'income') row.income += Number(e.amount)
      else row.expense += Number(e.amount)
    }
    const rows = Array.from(byMonth.values()).sort((a, b) => a.month.localeCompare(b.month))
    let running = 0
    for (const r of rows) {
      running += r.income - r.expense
      r.balance = running
    }
    return rows
  }, [entries])

  if (loading) return <p>読み込み中...</p>

  return (
    <div className="page">
      <h2>ダッシュボード</h2>
      {chartData.length === 0 ? (
        <p>まだデータがありません。「収支入力」から登録してください。</p>
      ) : (
        <>
          <h3>月次 収入・支出</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="収入" fill="#4caf50" />
              <Bar dataKey="expense" name="支出" fill="#e57373" />
            </BarChart>
          </ResponsiveContainer>

          <h3>累計バランス推移</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" name="累計バランス" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
