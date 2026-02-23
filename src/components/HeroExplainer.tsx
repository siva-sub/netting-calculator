import { Zap } from 'lucide-react'

/**
 * Hero Explainer — visual "pipe" metaphor.
 * Two opposing flows enter, the overlap cancels, only the net exits.
 * NO text-based arrows. Pure block layout with a visual flow diagram.
 */
export function HeroExplainer() {
    const send = 250_000
    const receive = 180_000
    const overlap = Math.min(send, receive)
    const net = send - receive
    const grossTotal = send + receive

    // Bar widths as percentages of grossTotal
    const sendPct = (send / grossTotal) * 100
    const recvPct = (receive / grossTotal) * 100
    const overlapPct = (overlap / grossTotal) * 100
    const netPct = (net / grossTotal) * 100

    return (
        <div className="hero-explainer">
            <div className="hero-title">
                <Zap size={20} strokeWidth={2.5} />
                <span>What is netting? See it in action.</span>
            </div>

            {/* ── Visual Flow Diagram ── */}
            <div className="flow-diagram">
                {/* Step 1: Two opposing flows */}
                <div className="flow-diagram-step">
                    <div className="flow-diagram-label">
                        <span className="step-num">1</span>
                        You have two flows each month
                    </div>
                    <div className="flow-viz">
                        <div className="flow-viz-row">
                            <span className="flow-viz-tag send">You → Supplier</span>
                            <div className="flow-viz-track">
                                <div className="flow-viz-bar send" style={{ width: `${sendPct}%` }} />
                            </div>
                            <span className="flow-viz-amount">$250K</span>
                        </div>
                        <div className="flow-viz-row">
                            <span className="flow-viz-tag recv">Supplier → You</span>
                            <div className="flow-viz-track">
                                <div className="flow-viz-bar recv" style={{ width: `${recvPct}%` }} />
                            </div>
                            <span className="flow-viz-amount">$180K</span>
                        </div>
                    </div>
                </div>

                {/* Step 2: The overlap cancels */}
                <div className="flow-diagram-step cancel-step">
                    <div className="flow-diagram-label">
                        <span className="step-num">2</span>
                        The overlap cancels out internally
                    </div>
                    <div className="flow-viz">
                        <div className="cancel-viz">
                            <div className="cancel-viz-bar-container">
                                {/* Send bar with hatched overlap */}
                                <div className="cancel-viz-row">
                                    <div className="flow-viz-track">
                                        <div className="flow-viz-bar send" style={{ width: `${sendPct}%` }}>
                                            <div
                                                className="cancel-hatch"
                                                style={{ width: `${(overlap / send) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Receive bar with hatched overlap */}
                                <div className="cancel-viz-row">
                                    <div className="flow-viz-track">
                                        <div className="flow-viz-bar recv" style={{ width: `${recvPct}%` }}>
                                            <div className="cancel-hatch full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cancel-annotation-hero">
                                <span className="cancel-amount">$180K</span> flows in both directions — these
                                cancel. No wire needed.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: Only the net settles */}
                <div className="flow-diagram-step result-step">
                    <div className="flow-diagram-label">
                        <span className="step-num">3</span>
                        Only the net difference crosses borders
                    </div>
                    <div className="flow-viz">
                        <div className="flow-viz-row">
                            <span className="flow-viz-tag net">Net wire</span>
                            <div className="flow-viz-track">
                                <div className="flow-viz-bar net" style={{ width: `${netPct}%` }} />
                            </div>
                            <span className="flow-viz-amount net-amount">$70K</span>
                        </div>
                    </div>
                    <div className="result-comparison">
                        <div className="result-col bad">
                            <div className="result-col-label">Without netting</div>
                            <div className="result-col-value">$430,000</div>
                            <div className="result-col-detail">2 wires, full FX on each</div>
                        </div>
                        <div className="result-vs">→</div>
                        <div className="result-col good">
                            <div className="result-col-label">With netting</div>
                            <div className="result-col-value">$70,000</div>
                            <div className="result-col-detail">1 wire, 84% less capital</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-punchline">
                <strong>The FX rate stays the same.</strong> You just apply it to $70K instead of $430K.
                That's~$3,600 less in bank markup every month at 1% spread.
            </div>
        </div>
    )
}
