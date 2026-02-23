# Correspondent Netting & Savings Calculator

> **See exactly how netting transforms cross-border payment costs and frees up trapped liquidity.**

An interactive browser-based calculator designed to demystify the economics of cross-border transfers. Compare the traditional multi-hop correspondent banking path against a modern netted/fintech path (like TransferWise/Nium) and explore visual Dagre-driven flow graphs that illustrate the difference between gross tier-1 settlement and netted settlement.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://typescriptlang.org)
[![Mantine](https://img.shields.io/badge/Mantine-7.17-339AF0?logo=mantine)](https://mantine.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)

---

## 🚀 [Launch Live Demo](https://siva-sub.github.io/netting-calculator/)

---

## 💡 Why I Built This

Cross-border payments generally suffer from high costs (global average ~6.25%), largely because of the underlying **Economics Layer**, not the messaging layer. The actual SWIFT message costs pennies. The real friction lies in **Nostro pre-funding, FX markups, and intermediary lifting fees**.

> **"SWIFT isn't the spread. The split ledger architecture and lack of netting is the spread."**

| Comparison | Traditional Correspondent Path | Netted/Fintech Path |
|------------|--------------------------------|---------------------|
| **Settlement Method** | Gross (often serial via INGA/INDA) | Multilateral or bilateral internal netting |
| **FX Mechanism** | Bank-dictated (often 1.5–5% spread) | Mid-market pooled execution |
| **Lifting Fees** | $10–$50 per hop | None (internal transfer) |
| **Liquidity Need** | 100% pre-funded Nostro accounts | Near-zero (net settlement) |

This tool pairs with my **Weekly Correspondent Banking Deep Dives** on LinkedIn. Use this calculator to dynamically model a $50K to $1M transaction and instantly see the projected savings through a netted architecture.

---

## ✨ Features

### 🧮 Dynamic Savings Calculator
- **Parameter Engine:** Configure variables like Transfer Amount, Correspondent FX Spread (1.5% - 5%), Intermediary Count (1-4 hops), Intermediary Fee ($15-$30), Sender Wire Fee, and Fintech FX markup.
- **Side-by-Side Analysis:** Instantly compares the 'Traditional Bank' path with the 'Fintech Routing' path.
- **Cost Metrics:** Calculates explicit fee totals, realized FX loss, and percentage hit to principal.

### 🌐 Graph Visualization (Dagre Integration)
- **Gross vs Net Visualization:** Uses `dagre` to auto-layout the systemic flow of liquidity.
- **Enterprise View:** See the systemic reduction in flows (e.g., from 6 individual lines to a central netting node). Shows how **1,800 units of gross flow** compress into just **200 units of net flow**.
- **Corridor View:** Demonstrates the typical 3-hop traditional flow (Originator → Intermediary → Intermediary → Beneficiary) versus a Fintech "Local-in, Local-out" flow.

### 📚 Integrated Knowledge & References
- **Structured References Tab:** Contains exact citations and links from the BIS, McKinsey, FSB, and World Bank validating the cost mechanics of correspondent banking.
- **Learn Tab:** Explains the mechanics of "The Two Paths" explicitly to guide users through the educational aspects of netting.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Browser (Client-Side Only)              │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  App.tsx     │  │ Graph Engine │  │  index.css     │  │
│  │  3-tab UI    │  │ (Dagre)      │  │  Brand tokens  │  │
│  │  Parameter   │  │ dynamic SVG  │  │  Mantine overrides││
│  │  slider state│  │ link rendering│ │               │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                   │            │
│  ┌──────▼──────┐  ┌──────▼───────┐                       │
│  │  main.tsx   │  │  Mantine 7   │                       │
│  │  Entry      │  │  UI library  │                       │
│  └─────────────┘  └──────────────┘                       │
│                                                           │
│  No backend. No API calls. Everything runs in your browser│
└──────────────────────────────────────────────────────────┘
```

This is a **zero-backend, client-side application**. Your data never leaves the browser. 

---

## 📂 Project Structure

```
netting-calculator/
├── src/
│   ├── App.tsx             # Main layout, Mantine tabs, and Calculator logic
│   ├── components/
│   │   ├── ParameterControls.tsx  # Sliders and numeric inputs
│   │   ├── Visualizations.tsx     # Dagre graphing logic (Enterprise/Corridor views)
│   │   ├── ReferenceTab.tsx       # Research citations and data sources
│   │   └── LearnTab.tsx           # Educational breakdown of flow types
│   ├── index.css           # Global typography and brut-card styling
│   └── main.tsx            # React entry
├── package.json            # Dependencies
└── vite.config.ts          # Vite build config
```

---

## 🛠 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start
```bash
git clone https://github.com/siva-sub/netting-calculator.git
cd netting-calculator
npm install
npm run dev
```

Open `http://localhost:5173/netting-calculator/` to view the app in action.

---

## 👤 About the Author

**Sivasubramanian Ramanathan**  
*Product Owner | Fintech, Payments & Digital Innovation*  
*Ex-BIS Innovation Hub Singapore*

Building at the intersection of payments infrastructure and AI. Open for roles in Product Management, Fintech, Payments, and Digital Assets.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-sivasub987-blue?logo=linkedin)](https://www.linkedin.com/in/sivasub987)
[![Website](https://img.shields.io/badge/Website-sivasub.com-green?logo=google-chrome)](https://www.sivasub.com)
[![GitHub](https://img.shields.io/badge/GitHub-siva--sub-black?logo=github)](https://github.com/siva-sub)

---

## 📄 License

MIT License © 2026 [Siva Subramanian](https://sivasub.com)

---

Built with ❤️ for the payments community.
