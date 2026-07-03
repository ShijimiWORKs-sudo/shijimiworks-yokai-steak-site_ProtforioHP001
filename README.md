# PLANECT — 株式会社プラネクト（架空）

企画提案型コンサルティングファームのポートフォリオ／コーポレートサイト。
**まだ見ぬ、勝ち筋を。** をコンセプトにした、架空企業のデモサイトです。

> ⚠️ これは学習・ポートフォリオ目的の**架空（フィクション）**のWebサイトです。実在の企業・団体とは関係ありません。

## 特徴

- **静的サイト**（HTML / CSS / Vanilla JS）— ビルド不要
- **GSAP + ScrollTrigger** によるスクロール連動アニメーション（文字マスク登場・フェードイン・数値カウントアップ・パララックス）
- **Lenis** による慣性スムーズスクロール
- カスタムカーソル / プリローダー / 無限マーキー / フルスクリーンモバイルメニュー
- レスポンシブ対応（デスクトップ〜モバイル）
- `prefers-reduced-motion` 配慮
- 画像は著作権フリー（[Lorem Picsum](https://picsum.photos/) = Unsplashソース）

## セクション構成

| # | Section | 内容 |
|---|---------|------|
| 01 | About | 理念・信条・実績数値 |
| 02 | Services | 事業企画 / ブランド戦略 / コミュニケーション設計 / 実行支援 |
| 03 | Approach | Listen → Insight → Idea → Proposal → Drive |
| 04 | Works | 実績サンプル 6件 |
| 05 | Team | メンバー紹介 |
| 06 | News | お知らせ |
| 07 | FAQ | よくある質問 |
| 08 | Contact | お問い合わせフォーム（デモ） |

## ローカルでの表示

任意の静的サーバーで `index.html` を配信するだけです。

```bash
# 例1: npx serve
npx serve . -l 4321

# 例2: Python
python -m http.server 4321
```

ブラウザで <http://localhost:4321> を開いてください。

## 技術スタック

- HTML5 / CSS3 / JavaScript (ES6)
- [GSAP 3.12](https://gsap.com/) + ScrollTrigger（CDN）
- [Lenis 1.1](https://github.com/darkroomengineering/lenis)（CDN）
- Google Fonts: Syne / Zen Kaku Gothic New / Noto Sans JP

## ファイル構成

```
planect/
├─ index.html        # 全コンテンツ・マークアップ
├─ css/style.css     # デザイン・レスポンシブ
├─ js/main.js        # アニメーション・インタラクション
├─ README.md
└─ .gitignore
```

## ライセンス

MIT
