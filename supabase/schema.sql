-- 家計簿アプリ DBスキーマ
-- Supabase の SQL Editor でそのまま実行してください

-- 生活管理: 月次の収入・支出
create table if not exists monthly_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year_month date not null, -- 月の1日を保存 (例: 2024-04-01)
  category text not null,   -- '給料' '電気代' など
  kind text not null check (kind in ('income', 'expense')),
  amount numeric not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_monthly_entries_user_month on monthly_entries(user_id, year_month);

-- 投資管理: NISA等の積立記録
create table if not exists investment_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account text not null,   -- 'NISA成長投資枠' 'NISA積立投資枠' 'スペースX' など
  entry_date date not null,
  contribution numeric not null,   -- 積立金額（累計）
  valuation numeric,               -- 投資結果（評価額）
  created_at timestamptz not null default now()
);
create index if not exists idx_investment_entries_user on investment_entries(user_id, account, entry_date);

-- 特別出費: 買い物明細
create table if not exists special_expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expense_date date not null,
  item text not null,
  amount numeric not null,
  memo text,
  created_at timestamptz not null default now()
);
create index if not exists idx_special_expenses_user_date on special_expenses(user_id, expense_date);

-- Row Level Security: 自分のデータのみ操作可能
alter table monthly_entries enable row level security;
alter table investment_entries enable row level security;
alter table special_expenses enable row level security;

drop policy if exists "select own monthly_entries" on monthly_entries;
create policy "select own monthly_entries" on monthly_entries for select using (auth.uid() = user_id);
drop policy if exists "modify own monthly_entries" on monthly_entries;
create policy "modify own monthly_entries" on monthly_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "select own investment_entries" on investment_entries;
create policy "select own investment_entries" on investment_entries for select using (auth.uid() = user_id);
drop policy if exists "modify own investment_entries" on investment_entries;
create policy "modify own investment_entries" on investment_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "select own special_expenses" on special_expenses;
create policy "select own special_expenses" on special_expenses for select using (auth.uid() = user_id);
drop policy if exists "modify own special_expenses" on special_expenses;
create policy "modify own special_expenses" on special_expenses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
