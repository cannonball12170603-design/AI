// 「3000円」「３０００」のような音声認識結果から数字だけを取り出す
export function parseSpokenAmount(text: string): string {
  const halfWidth = text.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
  const match = halfWidth.match(/[0-9]+/)
  return match ? match[0] : ''
}
