import { Text } from '@mantine/core'
import { X, Check } from 'lucide-react'
import type { Corridor } from '../helpers'
import { fmtCompact } from '../helpers'

export function Waterfall({ corridors }: { corridors: Corridor[] }) {
    let gross = 0
    let net = 0
    corridors.forEach((c) => {
        const a = Number(c.flowAtoB) || 0
        const b = Number(c.flowBtoA) || 0
        gross += a + b
        net += Math.abs(a - b)
    })
    const canceled = gross - net
    const ratio = gross > 0 ? (canceled / gross) * 100 : 0
    const netPct = gross > 0 ? (net / gross) * 100 : 0

    return (
        <div className="waterfall-section">
            <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: '0.08em' }}>
                Total Compression Across All Corridors
            </Text>

            <div className="waterfall">
                <div className="waterfall-row">
                    <div className="waterfall-label">Gross Volume</div>
                    <div className="waterfall-bar-track">
                        <div className="waterfall-bar gross" style={{ width: '100%' }} />
                    </div>
                    <div className="waterfall-value mono">{fmtCompact(gross)}</div>
                </div>
                <div className="waterfall-row canceled">
                    <div className="waterfall-label" style={{ color: 'var(--error)' }}>
                        <X size={12} style={{ marginRight: 3 }} /> Canceled
                    </div>
                    <div className="waterfall-bar-track">
                        <div
                            className="waterfall-bar cancel"
                            style={{ width: `${100 - netPct}%`, marginLeft: `${netPct}%` }}
                        />
                    </div>
                    <div className="waterfall-value mono" style={{ color: 'var(--error)' }}>
                        −{fmtCompact(canceled)}
                    </div>
                </div>
                <div className="waterfall-row">
                    <div className="waterfall-label" style={{ color: 'var(--success)', fontWeight: 700 }}>
                        <Check size={12} style={{ marginRight: 3 }} /> Net Exposure
                    </div>
                    <div className="waterfall-bar-track">
                        <div className="waterfall-bar net" style={{ width: `${netPct}%` }} />
                    </div>
                    <div className="waterfall-value mono" style={{ color: 'var(--success)', fontWeight: 700 }}>
                        {fmtCompact(net)}
                    </div>
                </div>
            </div>

            <div className="compression-badge">
                <span className="compression-pct">{ratio.toFixed(1)}%</span>
                <span className="compression-label">of payments never need to cross borders</span>
            </div>
        </div>
    )
}
