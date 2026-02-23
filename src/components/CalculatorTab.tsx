import { useState, useMemo, useCallback } from 'react'
import { Paper, Stack, Text } from '@mantine/core'
import { ArrowRightLeft, TrendingDown, Plus, Trash2, Banknote, Send, Reply } from 'lucide-react'
import type { Corridor } from '../helpers'
import { fmt, getColor } from '../helpers'
import { PRESETS } from '../presets'
import { HeroExplainer } from './HeroExplainer'
import { CorridorCard } from './CorridorCard'
import { Waterfall } from './Waterfall'

let nextId = 100

export function CalculatorTab() {
    const [corridors, setCorridors] = useState<Corridor[]>(PRESETS[1].corridors)
    const [activePreset, setActivePreset] = useState<number>(1)

    const addCorridor = useCallback(() => {
        nextId++
        setCorridors((prev) => [
            ...prev,
            { id: String(nextId), currencyA: 'USD', currencyB: 'CAD', flowAtoB: 0, flowBtoA: 0 },
        ])
        setActivePreset(-1)
    }, [])

    const removeCorridor = useCallback((id: string) => {
        setCorridors((prev) => (prev.length <= 1 ? prev : prev.filter((c) => c.id !== id)))
        setActivePreset(-1)
    }, [])

    const updateCorridor = useCallback(
        (id: string, field: keyof Corridor, value: string | number) => {
            setCorridors((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
            setActivePreset(-1)
        },
        [],
    )

    const loadPreset = useCallback((idx: number) => {
        setCorridors(PRESETS[idx].corridors)
        setActivePreset(idx)
    }, [])

    // ── Cost model ──
    // SAME FX rate for both scenarios. Savings come from volume reduction only.
    const FX_SPREAD = 0.01 // 1.0% — typical bank FX markup
    const WIRE_FEE = 35 // per international wire

    const metrics = useMemo(() => {
        let gross = 0,
            net = 0,
            grossWires = 0,
            netWires = 0
        corridors.forEach((c) => {
            const a = Number(c.flowAtoB) || 0
            const b = Number(c.flowBtoA) || 0
            gross += a + b
            net += Math.abs(a - b)
            if (a > 0) grossWires++
            if (b > 0) grossWires++
            if (Math.abs(a - b) > 0) netWires++
        })
        const canceled = gross - net
        const ratio = gross > 0 ? (canceled / gross) * 100 : 0
        const grossWireFees = grossWires * WIRE_FEE
        const grossFxCost = gross * FX_SPREAD
        const grossCost = grossWireFees + grossFxCost
        const netWireFees = netWires * WIRE_FEE
        const netFxCost = net * FX_SPREAD
        const nettedCost = netWireFees + netFxCost
        const savings = grossCost - nettedCost
        const fxSaved = (gross - net) * FX_SPREAD
        return {
            gross, net, canceled, ratio,
            grossWires, netWires,
            grossWireFees, grossFxCost, grossCost,
            netWireFees, netFxCost, nettedCost,
            savings, annualSavings: savings * 12,
            fxSaved,
        }
    }, [corridors])

    const spreadPct = (FX_SPREAD * 100).toFixed(1)

    return (
        <Stack gap="lg">
            {/* Hero */}
            <HeroExplainer />

            {/* Two Paths — context bridge to GIF post */}
            <Paper className="brut-card two-paths-card" p="lg">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: '1px' }}>
                    From the post — Two Paths, One $50K SGD→GBP Payment
                </Text>
                <div className="two-paths-grid">
                    <div className="path-col path-corr">
                        <div className="path-header bad">Correspondent Banking</div>
                        <div className="path-steps-annotated">
                            <div className="path-step-row">
                                <span className="path-step-num bad">1</span>
                                <div>
                                    <div className="path-step-title">Wire fee <span className="path-cost bad">$20–40</span></div>
                                    <div className="path-step-why">The SWIFT message itself costs ~$0.05 (pennies). The $20–40 is your bank's outgoing wire charge — not SWIFT's fee.</div>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num bad">2</span>
                                <div>
                                    <div className="path-step-title">FX conversion <span className="path-cost bad">$750–1,500</span></div>
                                    <div className="path-step-why">Bank sets its own "board rate" — 1.5–3% above mid-market. Banks net at wholesale level via CLS (99%+ efficiency), but those savings stay with the bank. Your SME payment settles gross.</div>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num bad">3</span>
                                <div>
                                    <div className="path-step-title">Correspondent A <span className="path-cost bad">$15–25</span></div>
                                    <div className="path-step-why">Intermediary bank deducts a "lifting fee" from the payment for routing it onward</div>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num bad">4</span>
                                <div>
                                    <div className="path-step-title">Correspondent B <span className="path-cost bad">$15–25</span></div>
                                    <div className="path-step-why">Second intermediary takes another cut. More hops = more fees deducted from value</div>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num bad">5</span>
                                <div>
                                    <div className="path-step-title">Supplier credited</div>
                                    <div className="path-step-why">Beneficiary bank credits GBP — 1–3 business days after initiation</div>
                                </div>
                            </div>
                        </div>
                        <div className="path-total bad">~$800–1,600 (1.6–3.2%) · 1–3 days</div>
                        <div className="path-mechanism bad">
                            Banks do net — CLS settles $6T/day across 75 member banks with 99%+ efficiency. But that netting is wholesale-only. Your SME payment settles gross through the correspondent chain, paying full markup at each hop.
                        </div>
                    </div>
                    <div className="path-col path-fin">
                        <div className="path-header good">Fintech Pooling</div>
                        <div className="path-steps-annotated">
                            <div className="path-step-row">
                                <span className="path-step-num good">1</span>
                                <div>
                                    <div className="path-step-title">Local collection <span className="path-cost good">$0</span></div>
                                    <div className="path-step-why">You pay via domestic rail (FAST/ACH) — no SWIFT, no wire fee, no intermediary</div>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num good">2</span>
                                <div>
                                    <div className="path-step-title">FX conversion <span className="path-cost good">$175–250</span></div>
                                    <div className="path-step-why">Mid-market rate + transparent flat fee (0.35–0.5%). No hidden spread — the fee <em>is</em> the margin.</div>
                                </div>
                            </div>
                            <div className="path-step-row step-highlight">
                                <span className="path-step-num highlight">3</span>
                                <div>
                                    <div className="path-step-title"><strong>Netting</strong> <span className="path-cost good">$0</span></div>
                                    <div className="path-step-why">This is the key difference: fintechs bring netting to the retail/SME level. They pool offsetting flows across all their clients — if another client sends GBP→SGD, the flows cancel internally. No wire needed for the matched portion.</div>
                                    <span className="step-callout">← This is what you're calculating below</span>
                                </div>
                            </div>
                            <div className="path-step-row">
                                <span className="path-step-num good">4</span>
                                <div>
                                    <div className="path-step-title">Local payout <span className="path-cost good">$0</span></div>
                                    <div className="path-step-why">Supplier receives GBP via domestic rail (FPS/BACS) — same day, no correspondent needed</div>
                                </div>
                            </div>
                        </div>
                        <div className="path-total good">~$200–250 (0.35–0.5%) · Same day</div>
                        <div className="path-mechanism good">
                            Same netting principle as CLS, but applied at the retail/SME level. Pooled liquidity replaces per-bank Nostro accounts. Local rails replace SWIFT. Only the net residual across all clients hits the actual FX market.
                        </div>
                    </div>
                </div>
            </Paper>
            {/* Scenario Cards */}
            <div>
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: '1px' }}>
                    Try a Scenario
                </Text>
                <div className="scenario-grid">
                    {PRESETS.map((p, i) => (
                        <div
                            key={p.id}
                            className={`scenario-card ${activePreset === i ? 'selected' : ''}`}
                            onClick={() => loadPreset(i)}
                        >
                            <Text fw={700} size="sm" mb={4}>{p.name}</Text>
                            <Text size="xs" c="dimmed" lh={1.4}>{p.scenario}</Text>
                            <div className="scenario-highlights">
                                {p.highlights.map((h) => (
                                    <span key={h} className="scenario-pill">{h}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inputs — cleaner labels */}
            <Paper className="brut-card" p="lg">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: '1px' }}>
                    <ArrowRightLeft size={13} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }} />
                    Your Monthly Flows
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                    For each currency pair, enter how much you send out and how much comes back each month.
                </Text>
                <div className="corridor-list">
                    {corridors.map((c) => (
                        <div key={c.id} className="corridor-input-row">
                            <div className="pair-label">
                                <span className="ccy-dot" style={{ background: getColor(c.currencyA) }} />
                                {c.currencyA}
                                <span style={{ margin: '0 4px', color: 'var(--ink-tertiary)' }}>↔</span>
                                <span className="ccy-dot" style={{ background: getColor(c.currencyB) }} />
                                {c.currencyB}
                            </div>
                            <div className="input-group">
                                <label>
                                    <Send size={10} style={{ marginRight: 3, verticalAlign: 'text-bottom' }} />
                                    Outbound ({c.currencyA} → {c.currencyB})
                                </label>
                                <input
                                    type="number"
                                    value={c.flowAtoB === 0 ? '' : c.flowAtoB}
                                    placeholder="0"
                                    onChange={(e) =>
                                        updateCorridor(c.id, 'flowAtoB', e.target.value === '' ? 0 : Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="arrow-divider">
                                <ArrowRightLeft size={16} color="var(--ink-muted)" />
                            </div>
                            <div className="input-group">
                                <label>
                                    <Reply size={10} style={{ marginRight: 3, verticalAlign: 'text-bottom' }} />
                                    Inbound ({c.currencyB} → {c.currencyA})
                                </label>
                                <input
                                    type="number"
                                    value={c.flowBtoA === 0 ? '' : c.flowBtoA}
                                    placeholder="0"
                                    onChange={(e) =>
                                        updateCorridor(c.id, 'flowBtoA', e.target.value === '' ? 0 : Number(e.target.value))
                                    }
                                />
                            </div>
                            <button className="remove-btn" onClick={() => removeCorridor(c.id)} title="Remove">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
                    <button className="add-btn" onClick={addCorridor}>
                        <Plus size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }} />
                        Add Currency Pair
                    </button>
                </div>
            </Paper>

            {/* Visualization */}
            <Paper className="brut-card" p="lg">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: '1px' }}>
                    <TrendingDown size={13} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }} />
                    How Your Flows Cancel Out
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                    The hatched area offsets internally — that money never crosses borders and you pay zero FX on it.
                </Text>
                <Stack gap="md">
                    {corridors.map((c) => (
                        <CorridorCard key={c.id} corridor={c} />
                    ))}
                </Stack>
            </Paper>

            {/* Waterfall */}
            <Paper className="brut-card" p="lg">
                <Waterfall corridors={corridors} />
            </Paper>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{fmt(metrics.gross)}</div>
                    <div className="stat-label">Gross Volume</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent-warm)' }}>{fmt(metrics.net)}</div>
                    <div className="stat-label">Settles on Wire</div>
                </div>
                <div className="stat-card highlight-green">
                    <div className="stat-value">{metrics.ratio.toFixed(1)}%</div>
                    <div className="stat-label">Eliminated</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--success)' }}>{fmt(metrics.annualSavings)}</div>
                    <div className="stat-label">Annual Savings</div>
                </div>
            </div>

            {/* Cost Table — SAME rate, different volumes */}
            <Paper className="brut-card" p="lg">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: '1px' }}>
                    <Banknote size={13} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }} />
                    Cost Breakdown
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                    Same FX rate ({spreadPct}%), same bank. The only difference is how much volume crosses borders.
                </Text>
                <div className="table-scroll">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Without Netting</th>
                                <th>With Netting</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Volume on wire</strong></td>
                                <td className="mono">{fmt(metrics.gross)}</td>
                                <td className="mono">{fmt(metrics.net)}</td>
                            </tr>
                            <tr>
                                <td><strong>Number of wires</strong></td>
                                <td className="mono">{metrics.grossWires} transfers</td>
                                <td className="mono">{metrics.netWires} transfer{metrics.netWires !== 1 ? 's' : ''}</td>
                            </tr>
                            <tr>
                                <td><strong>Wire fees</strong> <span className="meta">($35 ea)</span></td>
                                <td className="mono"><span style={{ color: 'var(--error)' }}>{fmt(metrics.grossWireFees)}</span></td>
                                <td className="mono">{fmt(metrics.netWireFees)}</td>
                            </tr>
                            <tr>
                                <td><strong>FX cost</strong> <span className="meta">({spreadPct}% spread)</span></td>
                                <td className="mono"><span style={{ color: 'var(--error)' }}>{fmt(metrics.grossFxCost)}</span></td>
                                <td className="mono">{fmt(metrics.netFxCost)}</td>
                            </tr>
                            <tr className="row-total">
                                <td><strong>Monthly cost</strong></td>
                                <td className="mono" style={{ color: 'var(--error)', fontWeight: 700 }}>{fmt(metrics.grossCost)}</td>
                                <td className="mono" style={{ color: 'var(--success)', fontWeight: 700 }}>{fmt(metrics.nettedCost)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="savings-banner">
                    <div className="savings-banner-label">You save each month</div>
                    <div className="savings-banner-value">{fmt(metrics.savings)}</div>
                    <div className="savings-banner-detail">
                        {fmt(metrics.fxSaved)} from FX · {fmt(metrics.grossWireFees - metrics.netWireFees)} from wire fees
                    </div>
                </div>
            </Paper>
        </Stack>
    )
}
