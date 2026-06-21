import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import { useAuth } from './lib/useAuth'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MonthlyEntries from './pages/MonthlyEntries'
import Investments from './pages/Investments'
import SpecialExpenses from './pages/SpecialExpenses'

function AppShell() {
  const { session, loading } = useAuth()

  if (loading) return <p>読み込み中...</p>
  if (!session) return <Login />

  return (
    <div className="app">
      <header className="app-header">
        <h1>家計簿アプリ</h1>
        <button onClick={() => supabase.auth.signOut()}>ログアウト</button>
      </header>
      <nav className="app-nav">
        <NavLink to="/" end>ダッシュボード</NavLink>
        <NavLink to="/entries">収支入力</NavLink>
        <NavLink to="/investments">投資管理</NavLink>
        <NavLink to="/special">特別出費</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/entries" element={<MonthlyEntries />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/special" element={<SpecialExpenses />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  )
}
