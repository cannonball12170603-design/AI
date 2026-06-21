# 家計簿アプリ

Excelで管理していた家計簿（生活管理・投資管理・特別出費）をPWA化したものです。
React + Vite + Supabase で構築しています。

## セットアップ

### 1. Supabaseプロジェクトを作成

1. https://supabase.com で新規プロジェクトを作成
2. SQL Editor で `supabase/schema.sql` の内容を実行（テーブル作成・RLS設定）
3. Authentication > Providers で Email を有効化（デフォルトで有効）

### 2. 環境変数の設定

```bash
cp .env.example .env
```

`.env` に Supabase の Project URL と anon key を入力してください（Supabaseダッシュボードの Settings > API から取得）。

### 3. 開発サーバー起動

```bash
npm install
npm run dev
```

### 4. スマホでPWAとして使う

1. `npm run build` でビルドし、Vercel/Netlify等にデプロイ
2. スマホのブラウザでアクセスし、「ホーム画面に追加」

## 既存Excelデータの移行

`生活管理`・`投資管理` シートは `scripts/import_excel.py` で自動取り込みできます。

```bash
pip install openpyxl requests
export SUPABASE_URL=https://xxxxx.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=...   # Settings > API の service_role キー
export SUPABASE_USER_ID=...            # アプリで作成したアカウントのユーザーID（Authentication画面で確認）
python scripts/import_excel.py /path/to/家計簿.xlsx
```

`特別出費` シートは月によって列レイアウトが不規則なため自動取り込みは行わず、`special_expenses_export.csv` に書き出します。内容を確認して、アプリのUIから手入力してください。

## 機能

- **ダッシュボード**: 月次の収入・支出グラフ、累計バランスの推移
- **収支入力**: 生活管理シートに相当する収支の記録・編集・削除
- **投資管理**: NISA等の積立金額・評価額の記録とグラフ表示
- **特別出費**: 買い物明細などの個別出費の記録
