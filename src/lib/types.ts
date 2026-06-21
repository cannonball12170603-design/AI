export type MonthlyEntry = {
  id: string
  user_id: string
  year_month: string // 'YYYY-MM-01'
  category: string
  kind: 'income' | 'expense'
  amount: number
  created_at: string
}

export type InvestmentEntry = {
  id: string
  user_id: string
  account: string
  entry_date: string
  contribution: number
  valuation: number | null
  created_at: string
}

export type SpecialExpense = {
  id: string
  user_id: string
  expense_date: string
  item: string
  amount: number
  memo: string | null
  created_at: string
}
