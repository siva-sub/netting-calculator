import { Paper, Stack, Title, Text } from '@mantine/core'
import {
    TrendingDown, Globe, ShieldAlert, HelpCircle, Layers, Zap,
    ArrowRightLeft, AlertTriangle, Building, Wallet
} from 'lucide-react'

export function LearnTab() {
    return (
        <Stack gap="lg">
            {/* ── 1. How Bilateral Netting Works ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <TrendingDown size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        How Bilateral Netting Works
                    </Title>
                    <p>
                        If you pay a European supplier $250K each month, and they pay you $180K back (for returns,
                        services, etc.), you're moving <strong>$430K across borders</strong> every month.
                    </p>
                    <p>
                        With netting, you offset the $180K that flows in both directions. Only the{' '}
                        <strong>$70K difference</strong> actually needs to cross borders. The rest cancels out
                        internally — you pay <strong>zero FX, zero wire fees</strong> on the canceled amount.
                    </p>
                    <div className="callout-box">
                        <strong>The math:</strong>
                        <br />
                        You send: $250,000 · You receive: $180,000
                        <br />
                        Overlap: $180,000 (cancels internally)
                        <br />
                        <strong>Net wire: $70,000</strong> — same FX rate, 84% less volume on wire.
                    </div>
                </div>
            </Paper>

            {/* ── 2. The 5 Layers of the Spread ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <Layers size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        The 5 Layers of Cross-Border Cost
                    </Title>
                    <p>
                        When people say "SWIFT is expensive," they're conflating the messaging fee ($0.05–$0.20) with
                        the entire cost stack. SWIFT doesn't set your FX rate or charge the spread — it just delivers
                        the instruction. Here's where the real cost lives:
                    </p>
                    <div className="table-scroll">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Layer</th>
                                    <th>What It Is</th>
                                    <th>Typical Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1. SWIFT Messaging</strong></td>
                                    <td>Instruction delivery</td>
                                    <td className="mono">$0.05–$0.20</td>
                                </tr>
                                <tr>
                                    <td><strong>2. FX Markup</strong></td>
                                    <td>Bank's spread over mid-market rate</td>
                                    <td className="mono" style={{ color: 'var(--error)' }}>1.5–5% (retail)<br />~10 bps (wholesale)</td>
                                </tr>
                                <tr>
                                    <td><strong>3. Lifting Fees</strong></td>
                                    <td>Each intermediary bank takes a cut</td>
                                    <td className="mono">$10–$30 per hop</td>
                                </tr>
                                <tr>
                                    <td><strong>4. Compliance</strong></td>
                                    <td>AML/KYC screening, sanctions checks</td>
                                    <td className="mono">Baked into spread</td>
                                </tr>
                                <tr>
                                    <td><strong>5. Treasury Margin</strong></td>
                                    <td>Bank's profit layer</td>
                                    <td className="mono">0.25–1%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout-box">
                        <strong>$50K wire via correspondent banking:</strong> ~$1,605 (3.21%)
                        <br />
                        <strong>Same $50K via Wise:</strong> ~$250 (0.50%)
                        <br />
                        <span style={{ color: 'var(--success)', fontWeight: 700 }}>Net difference: ~$1,355 saved (6.4× cheaper)</span>
                    </div>
                </div>
            </Paper>

            {/* ── 3. CLS ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <Globe size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        CLS: The Gold Standard of Netting
                    </Title>
                    <p>
                        CLS (Continuous Linked Settlement) handles ~50% of all global FX transactions — over 1
                        million trades per day across 18 currencies. Using multilateral netting:
                    </p>
                    <span className="highlight-stat">99%+ netting efficiency</span>
                    <ul>
                        <li>For every <strong>$100M settled</strong>, banks fund only <code>~$380K</code></li>
                        <li>96% reduction via multilateral netting, 99%+ with in/out swaps</li>
                        <li>Designated <strong>systemically important</strong> by CPMI/IOSCO (2012)</li>
                        <li>Founded in 2002 to prevent Herstatt-style settlement failures</li>
                    </ul>
                    <div className="callout-amber">
                        <Text size="sm" fw={700} mb={8}>
                            <HelpCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 4 }} />
                            Why don't SMEs get this benefit?
                        </Text>
                        <p style={{ margin: 0 }}>
                            CLS is wholesale-only — accessible to 75+ settlement member banks. Your company settles
                            grossly through correspondent chains, paying the full spread on every wire. Fintech netting
                            platforms like Wise aim to bring this efficiency to everyone.
                        </p>
                    </div>
                </div>
            </Paper>

            {/* ── 4. Herstatt Risk ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <ShieldAlert size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        Herstatt Risk (1974)
                    </Title>
                    <p>
                        On June 26, 1974, German regulators closed <strong>Bankhaus Herstatt</strong> at 3:30 PM CET.
                        The bank had already received Deutsche Marks from US counterparties, but New York was just
                        opening — <strong>$620M in USD payouts were cancelled</strong> mid-flight.
                    </p>
                    <p>
                        This time-zone gap — <strong>Herstatt Risk</strong> — led to the creation of the Basel
                        Committee on Banking Supervision and ultimately CLS (2002), which ensures
                        payment-versus-payment (PvP): neither leg settles until both are confirmed.
                    </p>
                </div>
            </Paper>

            {/* ── 5. Fintech Pooling — How Wise Actually Works ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <ArrowRightLeft size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        How Wise's Pooling Model Works
                    </Title>
                    <p>
                        Wise doesn't actually send your money across borders. Instead, they maintain <strong>local
                            currency pools</strong> in 160+ countries. When you "send" money from the UK to Europe:
                    </p>
                    <ul>
                        <li>Your GBP enters Wise's <strong>UK pool</strong> (a domestic transaction)</li>
                        <li>EUR exits Wise's <strong>Euro pool</strong> to your recipient (another domestic transaction)</li>
                        <li>No money actually crosses a border — it's <strong>two local payments</strong></li>
                        <li>Wise periodically rebalances pools at wholesale FX rates (~10 bps)</li>
                    </ul>
                    <div className="table-scroll">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Annual volume (FY25)</td><td className="mono">£145.2B</td></tr>
                                <tr><td>Bank partners</td><td className="mono">70+</td></tr>
                                <tr><td>Countries served</td><td className="mono">160+</td></tr>
                                <tr><td>FX model</td><td className="mono">Mid-market + transparent fee</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout-amber">
                        <Text size="sm" fw={700} mb={8}>
                            <Building size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 4 }} />
                            Why fintechs still need banks
                        </Text>
                        <p style={{ margin: 0 }}>
                            Fintechs can't hold deposits (EMI license ≠ bank). Customer funds must sit in ring-fenced
                            accounts at licensed banks. They also need bank sponsorship for local rails (FAST, FPS, ACH,
                            UPI, PIX). In exotic corridors without bilateral flow (e.g., SGD→NGN), they fall back to
                            correspondent banking.
                        </p>
                    </div>
                </div>
            </Paper>

            {/* ── 6. The Liquidity Paradox ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <Zap size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        The Liquidity Paradox: Instant vs. Netting
                    </Title>
                    <p>
                        Making payments instant <em>increases</em> capital requirements because you lose the
                        efficiency of netting. Banks need 100% of funds available per transaction instead of
                        settling the net difference at end of day.
                    </p>
                    <div className="table-scroll">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>System</th>
                                    <th>Pre-funding</th>
                                    <th>Netting</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Deferred Net (DNS)</strong></td>
                                    <td className="mono">Low</td>
                                    <td className="mono" style={{ color: 'var(--success)' }}>High</td>
                                </tr>
                                <tr>
                                    <td><strong>RTGS (Real-Time)</strong></td>
                                    <td className="mono" style={{ color: 'var(--error)' }}>100% per txn</td>
                                    <td className="mono" style={{ color: 'var(--error)' }}>None</td>
                                </tr>
                                <tr>
                                    <td><strong>CLS (Hybrid)</strong></td>
                                    <td className="mono" style={{ color: 'var(--success)' }}>~1% of gross</td>
                                    <td className="mono" style={{ color: 'var(--success)' }}>99%+</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>The paradox:</strong> Instant payments sound better, but they trap more capital per
                        transaction. CLS's hybrid model (net first, settle the difference) is why it requires only
                        ~$380K in funding per $100M settled.
                    </p>
                </div>
            </Paper>

            {/* ── 7. Trapped Nostro Liquidity ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <Wallet size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        Trapped Nostro Liquidity: $2–4 Trillion Idle
                    </Title>
                    <p>
                        To make correspondent banking work, banks pre-fund <strong>Nostro/Vostro accounts</strong> at
                        each partner bank. Bank A keeps a ledger of what it thinks it owns; Bank B keeps a ledger of
                        what it thinks it owes — like a medieval <strong>tally stick</strong> split in two halves.
                    </p>
                    <p>
                        Because they don't share a unified database, they must constantly exchange SWIFT messages to
                        reconcile their halves. Industry estimates put <strong>$2–4 trillion</strong> trapped in these
                        pre-funded accounts globally (Oliver Wyman, McKinsey). This capital sits idle between
                        transactions — money banks could deploy for lending or investment.
                    </p>
                    <div className="callout-box">
                        <strong>This is what netting solves:</strong> by reducing the volume that crosses borders,
                        you reduce the capital that needs to sit in Nostro accounts waiting for settlement.
                    </div>
                </div>
            </Paper>

            {/* ── 8. De-Risking ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={3} mb="sm">
                        <AlertTriangle size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8 }} />
                        De-Risking: Financial Exclusion by Spreadsheet
                    </Title>
                    <p>
                        Correspondent banks are abandoning smaller, riskier jurisdictions. Compliance costs,
                        regulatory penalties, and low revenue make some corridors unprofitable. Since 2011:
                    </p>
                    <div className="table-scroll">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Region</th>
                                    <th>CBR Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Melanesia</td><td className="mono" style={{ color: 'var(--error)' }}>−62.6%</td></tr>
                                <tr><td>Polynesia</td><td className="mono" style={{ color: 'var(--error)' }}>−54.0%</td></tr>
                                <tr><td>Caribbean</td><td className="mono" style={{ color: 'var(--error)' }}>−52.1%</td></tr>
                                <tr><td>South America</td><td className="mono" style={{ color: 'var(--error)' }}>−50.5%</td></tr>
                                <tr><td>Pacific (USD)</td><td className="mono" style={{ color: 'var(--error)' }}>~80%</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        The human cost: remittance prices stay high (6.25% average vs UN 2030 target of 3%),
                        populations are trapped in cash economies, and money is pushed into unregulated <strong>Hawala
                            networks</strong> — the exact untraceable channels AML regulations were designed to eliminate.
                    </p>
                    <div className="callout-amber">
                        <Text size="sm" fw={700} mb={8}>
                            <HelpCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 4 }} />
                            The great irony
                        </Text>
                        <p style={{ margin: 0 }}>
                            Volume and value of cross-border payments <em>increased</em> over the same period. Fewer banks
                            handle more traffic = concentration risk. The 25% global decline in correspondent relationships
                            isn't "prudent compliance" — it's financial exclusion by spreadsheet.
                        </p>
                    </div>
                </div>
            </Paper>

            {/* ── Sources ── */}
            <Paper className="brut-card" p="lg">
                <div className="learn-section">
                    <Title order={4} mb="sm">Sources</Title>
                    <Text size="xs" c="dimmed" lh={1.8}>
                        CLS Group (cls-group.com) · BIS Quarterly Review 2020 · BIS/CPMI Chartpack 2023 ·
                        World Bank Remittance Prices · SWIFT GPI Reports (swift.com) · Wise Annual Report FY25 ·
                        Oliver Wyman · McKinsey Global Payments Report · FSB G20 Cross-Border Targets ·
                        RBA Bulletin June 2023 · Reuters Pacific Banking · US Treasury Remarks (jy2722)
                    </Text>
                </div>
            </Paper>
        </Stack>
    )
}
