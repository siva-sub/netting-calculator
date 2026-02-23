import { Text, Badge } from '@mantine/core'
import { ArrowRightLeft, ArrowRight, X, Check, Minus, Send, Reply } from 'lucide-react'
import type { Corridor } from '../helpers'
import { fmtCompact, getColor } from '../helpers'

export function CorridorCard({ corridor }: { corridor: Corridor }) {
    const a = Number(corridor.flowAtoB) || 0
    const b = Number(corridor.flowBtoA) || 0
    const gross = a + b
    const canceled = Math.min(a, b)
    const net = Math.abs(a - b)
    const netDir =
        a >= b
            ? `${corridor.currencyA} → ${corridor.currencyB}`
            : `${corridor.currencyB} → ${corridor.currencyA}`
    const efficiency = gross > 0 ? (canceled / gross) * 100 : 0
    const maxFlow = Math.max(a, b, 1)
    const barA = (a / maxFlow) * 100
    const barB = (b / maxFlow) * 100
    const overlapPct = (canceled / maxFlow) * 100

    return (
        <div className="corridor-card">
            <div className="corridor-card-header">
                <div className="corridor-pair">
                    <span className="ccy-dot" style={{ background: getColor(corridor.currencyA) }} />
                    <strong>{corridor.currencyA}</strong>
                    <ArrowRightLeft size={14} style={{ margin: '0 6px', opacity: 0.4 }} />
                    <span className="ccy-dot" style={{ background: getColor(corridor.currencyB) }} />
                    <strong>{corridor.currencyB}</strong>
                </div>
                <Badge
                    variant="light"
                    color={efficiency > 80 ? 'green' : efficiency > 40 ? 'yellow' : 'gray'}
                    size="sm"
                >
                    {efficiency.toFixed(0)}% offset
                </Badge>
            </div>

            <div className="flow-bars">
                <div className="flow-row">
                    <div className="flow-label">
                        <Send size={11} style={{ marginRight: 4, color: getColor(corridor.currencyA) }} />
                        <span style={{ color: getColor(corridor.currencyA), fontWeight: 700 }}>
                            {corridor.currencyA}
                        </span>
                        <ArrowRight size={10} style={{ margin: '0 2px', opacity: 0.5 }} />
                        <span style={{ color: getColor(corridor.currencyB), fontWeight: 700 }}>
                            {corridor.currencyB}
                        </span>
                    </div>
                    <div className="bar-track">
                        <div className="bar-fill bar-outflow" style={{ width: `${barA}%` }}>
                            {canceled > 0 && a > 0 && (
                                <div className="bar-overlap" style={{ width: `${(canceled / a) * 100}%` }} />
                            )}
                        </div>
                    </div>
                    <div className="flow-amount mono">{fmtCompact(a)}</div>
                </div>

                <div className="flow-row">
                    <div className="flow-label">
                        <Reply size={11} style={{ marginRight: 4, color: getColor(corridor.currencyB) }} />
                        <span style={{ color: getColor(corridor.currencyB), fontWeight: 700 }}>
                            {corridor.currencyB}
                        </span>
                        <ArrowRight size={10} style={{ margin: '0 2px', opacity: 0.5 }} />
                        <span style={{ color: getColor(corridor.currencyA), fontWeight: 700 }}>
                            {corridor.currencyA}
                        </span>
                    </div>
                    <div className="bar-track">
                        <div className="bar-fill bar-inflow" style={{ width: `${barB}%` }}>
                            {canceled > 0 && b > 0 && (
                                <div className="bar-overlap" style={{ width: `${(canceled / b) * 100}%` }} />
                            )}
                        </div>
                    </div>
                    <div className="flow-amount mono">{fmtCompact(b)}</div>
                </div>

                {canceled > 0 && (
                    <div className="cancel-annotation">
                        <div className="cancel-line">
                            <div className="cancel-bar" style={{ width: `${overlapPct}%` }} />
                        </div>
                        <div className="cancel-text">
                            <X size={13} style={{ color: 'var(--error)', marginRight: 3 }} />
                            <span style={{ color: 'var(--error)' }}>{fmtCompact(canceled)} offsets internally</span>
                            <span className="cancel-detail"> — no wire needed</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="corridor-result">
                <div className="result-icon">
                    <Check size={16} strokeWidth={3} />
                </div>
                <div className="result-text">
                    <strong>Only {fmtCompact(net)} settles</strong>
                    <span className="result-direction">
                        {net > 0 ? netDir : 'Fully offset — zero wires'}
                    </span>
                </div>
                <div className="result-saved">
                    <Minus size={12} style={{ marginRight: 2 }} />
                    {fmtCompact(canceled)} saved
                </div>
            </div>
        </div>
    )
}
