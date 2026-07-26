# 生成素材一覧（Higgsfield / kling3_0_turbo）

## 完成動画（7カット結合済み・ナレーション/テロップ入り）

**視聴・ダウンロードURL：**
https://d2ol7oe51mr4n9.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/fdf4f78d-1ceb-461f-8438-b228f395fca3.mp4

- 尺：約44.9秒／縦型9:16／各カットに名所テロップ＋日本語ナレーション（Hana音声）入り
- 冒頭2.5秒に「福島の神スポット7選」、末尾2.5秒に「福島県、行くしかない。」のテロップを追加
- 構成：鶴ヶ城→大内宿→五色沼→猪苗代湖→あぶくま洞→花見山公園→スパリゾートハワイアンズ（この順で結合）
- 音量は-16 LUFSに正規化済み
- 各カットの秒数は「元動画5秒」と「ナレーション尺」の長い方に自動調整（足りない場合は最終フレームを静止延長）
- 生成・結合はHiggsfieldのクラウドサンドボックス（ffmpeg）上で実施。この実行環境のネットワークポリシーでCDNへの直接アクセスがブロックされているため、動画ファイル本体はリポジトリにコミットできず、上記URLのみ記録しています。お手元のPC・ブラウザからは直接視聴・ダウンロードが可能です。

このセッションの実行環境は、リポジトリのネットワークポリシーにより Higgsfield の配信CDN
（`cloudfront.net`）への直接アクセスがブロックされているため、生成した動画ファイル本体を
このリポジトリに直接コミットすることができませんでした。代わりに、各カットの生成結果URLと
生成メタデータを以下にまとめています。**リンクはユーザーのブラウザ・PCから直接アクセス・
ダウンロードが可能**です（このセッション内のみアクセス制限があります）。

すべて 720p・9:16縦型・5秒・モデル: `kling3_0_turbo`、人物なしのtext-to-video生成。

| カット | 名所 | 素材URL | Job ID |
|---|---|---|---|
| Cut2 | 鶴ヶ城（会津若松城） | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112904_e52e5a4b-7436-45e6-a16c-4af73df8f275.mp4 | e52e5a4b-7436-45e6-a16c-4af73df8f275 |
| Cut3 | 大内宿 | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112905_542912f7-db07-4b09-8d26-a1081ef5e17a.mp4 | 542912f7-db07-4b09-8d26-a1081ef5e17a |
| Cut4 | 五色沼（裏磐梯） | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112920_e5367bc2-ca4e-4cdd-95f8-9e90069bee41.mp4 | e5367bc2-ca4e-4cdd-95f8-9e90069bee41 |
| Cut5 | 猪苗代湖 | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112909_cbdd5bb0-4c34-4d06-a958-d8cb1eb9e4b2.mp4 | cbdd5bb0-4c34-4d06-a958-d8cb1eb9e4b2 |
| Cut6 | あぶくま洞 | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112910_eb2cfd2d-267c-442b-b3c1-119cc26504bc.mp4 | eb2cfd2d-267c-442b-b3c1-119cc26504bc |
| Cut7 | 花見山公園 | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112911_0cf575d6-0c9b-425f-b001-5574ccb440c9.mp4 | 0cf575d6-0c9b-425f-b001-5574ccb440c9 |
| Cut8 | スパリゾートハワイアンズ | https://d8j0ntlcm91z4.cloudfront.net/user_3H2RbstMbOpA6OwrzvgUeOnjREw/hf_20260726_112913_e930ed72-325d-43a0-adf4-7d0ce06b6ef5.mp4 | e930ed72-325d-43a0-adf4-7d0ce06b6ef5 |

## 未生成

- Cut1（フック用の高速フラッシュモンタージュ）: 上記7素材が揃った後、編集ソフト側で
  各カットの冒頭0.3〜0.5秒を切り出してコラージュする想定のため、追加生成はしていません。
- Cut9（クロージングのサムネコラージュ）: 静止画合成のため編集時対応。

## ダウンロード・編集への取り込み方

1. 上表のURLを開き、各mp4をローカルPCに保存
2. 動画編集ソフト（Premiere Pro / DaVinci Resolve / CapCut等）に取り込み
3. `../storyboard.md` のカット割りに沿ってトリミング・並び替え・テロップ追加
4. ナレーションは別途TTSまたは収録音声を合成
