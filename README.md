# Rakuraku CSV Generator

# 環境構築

```
git clone git@github.com:ishiyama-tomoki-work/rakuraku.git
```

```
npm i
```

# 実行方法

```
cd rakuraku
node days.js [number]
```

[number]　はオプション

- 例）オプションなし → 今月の日付のリストが出力される
- 例）`１`を入力 → １ヶ月後の日付のリストが出力される
- 例）`-1`を入力 → １ヶ月前の日付のリストが出力される

## 今月分を出力する場合の例

```
node days.js
```
