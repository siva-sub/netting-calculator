import type { Corridor } from './helpers'

export interface Preset {
    id: string
    name: string
    scenario: string
    description: string
    corridors: Corridor[]
    highlights: string[]
}

export const PRESETS: Preset[] = [
    {
        id: 'sme-supplier',
        name: 'SME — Single Supplier',
        scenario:
            'A small business in Singapore buys inventory from a UK supplier every month. They pay GBP and occasionally receive small GBP refunds. Low netting opportunity.',
        description: '1 corridor · SGD/GBP · Low netting',
        corridors: [
            { id: '1', currencyA: 'SGD', currencyB: 'GBP', flowAtoB: 50000, flowBtoA: 8000 },
        ],
        highlights: ['Low offset (16%)', 'Single corridor', 'Typical SME pattern'],
    },
    {
        id: 'mid-market',
        name: 'Mid-Market Treasury',
        scenario:
            'A mid-size SaaS company with EU and UK clients. They pay European vendors in EUR while collecting EUR subscription revenue. Similar dynamic with GBP. Good netting opportunity.',
        description: '2 corridors · Balanced · Good netting',
        corridors: [
            { id: '1', currencyA: 'USD', currencyB: 'EUR', flowAtoB: 250000, flowBtoA: 180000 },
            { id: '2', currencyA: 'USD', currencyB: 'GBP', flowAtoB: 100000, flowBtoA: 95000 },
        ],
        highlights: ['72% offset on EUR', '95% offset on GBP', '$275K capital freed'],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Multi-Currency',
        scenario:
            'A multinational with subsidiaries in Europe, Japan, and UK. Massive bidirectional flows across 3 corridors. Nearly all flows cancel out — this is where netting shines.',
        description: '3 corridors · High vol · Max compression',
        corridors: [
            { id: '1', currencyA: 'USD', currencyB: 'EUR', flowAtoB: 5000000, flowBtoA: 4800000 },
            { id: '2', currencyA: 'USD', currencyB: 'JPY', flowAtoB: 2000000, flowBtoA: 2500000 },
            { id: '3', currencyA: 'EUR', currencyB: 'GBP', flowAtoB: 1500000, flowBtoA: 1200000 },
        ],
        highlights: ['96%+ offset on EUR', '$16.5M capital freed', 'CLS-level efficiency'],
    },
    {
        id: 'marketplace',
        name: 'Marketplace Platform',
        scenario:
            'An online marketplace collecting from EU buyers in EUR and paying EU sellers in EUR, while also managing GBP and JPY corridors for UK and Japanese sellers.',
        description: '3 corridors · Platform flows · High frequency',
        corridors: [
            { id: '1', currencyA: 'USD', currencyB: 'EUR', flowAtoB: 800000, flowBtoA: 750000 },
            { id: '2', currencyA: 'USD', currencyB: 'GBP', flowAtoB: 400000, flowBtoA: 380000 },
            { id: '3', currencyA: 'USD', currencyB: 'JPY', flowAtoB: 300000, flowBtoA: 290000 },
        ],
        highlights: ['94% offset on EUR', '95% offset on GBP', '97% offset on JPY'],
    },
    {
        id: 'remittance',
        name: 'Remittance Corridor',
        scenario:
            'A fintech handling remittances from US workers to India and Philippines. Heavy one-directional flows with small returns. Shows where netting has limited benefit.',
        description: '2 corridors · One-way heavy · Low netting',
        corridors: [
            { id: '1', currencyA: 'USD', currencyB: 'INR', flowAtoB: 500000, flowBtoA: 20000 },
            { id: '2', currencyA: 'USD', currencyB: 'SGD', flowAtoB: 200000, flowBtoA: 15000 },
        ],
        highlights: ['Only 4% offset on INR', 'One-way corridors', 'Netting has limits'],
    },
]
