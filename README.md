# Raku-Ticket

## 概要
乃木坂46のライブに申し込む際に、楽天チケットのフォーム入力を自動化するブラウザ拡張機能です。  

## 拡張機能の使い方
1. 拡張機能を有効にした状態で楽天チケットの申込ページを開くと、「入力項目設定」ボタンと「自動入力実行」ボタンが表示されます。
2. （初回のみ必要）「入力項目設定」を押すと自動入力設定フォームが開くので、各項目に必要な情報を入力し、「保存」ボタンを押します。
3. 「自動入力実行」を押すと、保存した内容が自動で楽天チケットの申込フォームに入力されます。<br>注: 「第1希望公演名」及び「公演日・会場名」は自動入力対象外です。最初にこれらを手動で選択した上で、「自動入力実行」を押してください。

## 動作環境
以下ブラウザで動作することを確認しています。
- Google Chrome（PC）
- Microsoft Edge（PC）
- Microsoft Edge Canary（Androidスマホ）

※ メッセージアプリ先行はスマホからしか申し込めないため、Android をご利用の方は Microsoft Edge Canary の利用が便利です。

## 拡張機能のインストール方法
現在、Chrome ウェブストアや Microsoft Edge Addons 等では公開していないため、ファイルをローカルにダウンロードした上で、そのファイルを直接読み込ませる必要があります。

- Google Chrome（PC）の場合
  - [リリースページ](https://github.com/firemacho/raku-ticket/releases)より、`Source code(zip)` をダウンロードし、解凍してください。
  - `chrome://extensions/` にアクセスし、「デベロッパーモード」を有効にした上で、「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダを選択してください。詳細な手順はググったら出てきます。

- Microsoft Edge（PC）の場合
  - [リリースページ](https://github.com/firemacho/raku-ticket/releases)より、`Source code(zip)` をダウンロードし、解凍してください。
  - `edge://extensions/` にアクセスし、「開発者モード」を有効にした上で、「展開して読み込み」をクリックし、解凍したフォルダを選択してください。詳細な手順はググったら出てきます。

- Microsoft Edge Canary（Androidスマホ）の場合
  - 通常の Microsoft Edge ではなく、Microsoft Edge **Canary** を使用してください。
  - .crx ファイルを読み込ませる必要がありますので、[リリースページ](https://github.com/firemacho/raku-ticket/releases)より、`raku-ticket.crx` をダウンロードしてください。
    - 注： Microsoft Edge（PC）の「拡張機能のパック」を利用して生成したものです。不安な方はご自身でソースコードから .crx ファイルを生成してください。
  - .crx ファイルを読み込ませる手順はググったら出てきます。例えば以下が参考になります。
    - [https://w.atwiki.jp/sumaho_browser/pages/47.html#id_9b3f6d98](https://w.atwiki.jp/sumaho_browser/pages/47.html#id_9b3f6d98) の「開発者オプションを使う場合」と「.crxファイルから追加」を順に実行する

## 注
本ツールの利用により入力間違い等が発生した場合も、開発者は一切の責任を負いません。<br>
自己責任での利用をお願いします。
