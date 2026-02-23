import { Paper, Stack, Title, Text } from '@mantine/core'
import { ExternalLink } from 'lucide-react'

const REFERENCES = [
    {
        category: 'Industry Reports',
        sources: [
            {
                title: 'McKinsey Global Payments Report 2024',
                detail: 'Cross-border payments revenue ~$240B/year; monetisation rate ~16bps on ~$150T flows',
                url: 'https://www.mckinsey.com/industries/financial-services/our-insights/global-payments-report',
            },
            {
                title: 'BIS CPMI — Correspondent Banking (Technical Report)',
                detail: 'Nostro liquidity inefficiencies tie up trillions globally; ~35% of cross-border payment cost linked to prefunding and reconciliation',
                url: 'https://www.bis.org/cpmi/publ/d147.htm',
            },
            {
                title: 'World Bank Remittance Prices Worldwide',
                detail: 'Global average remittance cost at 6.25%',
                url: 'https://remittanceprices.worldbank.org/',
            },
        ],
    },
    {
        category: 'Settlement & Netting Infrastructure',
        sources: [
            {
                title: 'CLS Group — How CLS Works',
                detail: 'Settles ~$6T/day across 75 member banks with 99%+ netting efficiency via payment-vs-payment',
                url: 'https://www.cls-group.com/products/settlement/clssettlement/',
            },
            {
                title: 'BIS — Project Agorá',
                detail: 'Cross-border payments described as "slow, expensive, and opaque"; Nostro inefficiencies tie up global liquidity',
                url: 'https://www.bis.org/about/bisih/topics/fmis/agora.htm',
            },
            {
                title: 'FSB / G20 Roadmap for Enhancing Cross-Border Payments',
                detail: 'Targets for cost, speed, transparency, and access by 2027',
                url: 'https://www.fsb.org/2020/10/enhancing-cross-border-payments-stage-3-roadmap/',
            },
        ],
    },
    {
        category: 'SWIFT & Messaging',
        sources: [
            {
                title: 'SWIFT 2024 Annual Review',
                detail: '53.3M messages/day; ~$0.05/message; GPI shows ~90% reach beneficiary within 1 hour',
                url: 'https://www.swift.com/about-us/swift-annual-review',
            },
            {
                title: 'SWIFT GPI Tracker',
                detail: 'Real-time payment tracking and SLA monitoring across correspondent chains',
                url: 'https://www.swift.com/our-solutions/swift-gpi',
            },
        ],
    },
    {
        category: 'Fintech Pooling & Transparency',
        sources: [
            {
                title: 'Wise — How We Handle Your Money',
                detail: 'Pooling model: local collection, mid-market FX, internal netting, local payout. ~$12B quarterly cross-border volume',
                url: 'https://wise.com/gb/blog/how-does-wise-work',
            },
            {
                title: 'BIS CPMI — Correspondent Banking (Interim Report)',
                detail: 'De-risking trends: 25% decline in correspondent relationships 2011–2022; sub-Saharan Africa, Pacific Islands hardest hit',
                url: 'https://www.bis.org/cpmi/publ/d147.htm',
            },
        ],
    },
    {
        category: 'Government & Policy',
        sources: [
            {
                title: 'U.S. Treasury — Remarks on Cross-Border Payment Frictions (jy2722)',
                detail: '"In Africa, more than 20% of even wholesale payments take more than a day"',
                url: 'https://home.treasury.gov/news/press-releases/jy2722',
            },
        ],
    },
]

export function ReferenceTab() {
    return (
        <Stack gap="lg">
            <Text size="sm" c="dimmed" mb="xs">
                Sources cited across the Calculator and Learn tabs. All links open in a new tab.
            </Text>
            {REFERENCES.map((group) => (
                <Paper key={group.category} className="brut-card" p="lg">
                    <Title order={4} mb="md">{group.category}</Title>
                    <div className="ref-list">
                        {group.sources.map((src) => (
                            <a
                                key={src.url}
                                href={src.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ref-item"
                            >
                                <div className="ref-item-title">
                                    {src.title}
                                    <ExternalLink size={12} style={{ marginLeft: 6, opacity: 0.5 }} />
                                </div>
                                <div className="ref-item-detail">{src.detail}</div>
                            </a>
                        ))}
                    </div>
                </Paper>
            ))}
        </Stack>
    )
}
