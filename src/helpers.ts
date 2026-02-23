// ─── Types ───────────────────────────────────────────
export type Corridor = {
    id: string
    currencyA: string
    currencyB: string
    flowAtoB: number
    flowBtoA: number
}

// ─── Formatting ──────────────────────────────────────
export const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(n)

export const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
    return `$${n}`
}

// ─── Currency Colors ─────────────────────────────────
const NODE_COLORS: Record<string, string> = {
    USD: '#0277BD',
    EUR: '#2E7D32',
    GBP: '#7B1FA2',
    JPY: '#C62828',
    SGD: '#EF6C00',
    CAD: '#00695C',
    AUD: '#D84315',
    CHF: '#37474F',
    INR: '#F57F17',
}

export const getColor = (ccy: string) => NODE_COLORS[ccy] || '#3D4A5C'
