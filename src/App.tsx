import { Container, Tabs } from '@mantine/core'
import { Calculator, BookOpen, Table } from 'lucide-react'
import { CalculatorTab } from './components/CalculatorTab'
import { LearnTab } from './components/LearnTab'
import { ReferenceTab } from './components/ReferenceTab'

export default function App() {
    return (
        <Container size="md" py="xl">
            {/* Header */}
            <div className="hero-section">
                <h1>
                    Netting <span className="brand-accent">Calculator</span>
                </h1>
                <p className="hero-subtitle">
                    See how bilateral netting reduces cross-border payment costs. Enter your monthly flows and
                    watch the savings accumulate.
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="calculator" variant="default">
                <Tabs.List mb="lg" style={{ borderBottom: '1px solid var(--border-standard)' }}>
                    <Tabs.Tab
                        value="calculator"
                        leftSection={<Calculator size={16} />}
                    >
                        Calculator
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="learn"
                        leftSection={<BookOpen size={16} />}
                    >
                        Learn
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="reference"
                        leftSection={<Table size={16} />}
                    >
                        Reference
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="calculator">
                    <CalculatorTab />
                </Tabs.Panel>
                <Tabs.Panel value="learn">
                    <LearnTab />
                </Tabs.Panel>
                <Tabs.Panel value="reference">
                    <ReferenceTab />
                </Tabs.Panel>
            </Tabs>

            {/* Footer */}
            <footer className="app-footer">
                <a href="https://www.linkedin.com/in/sivasub987/" target="_blank" rel="noreferrer">
                    Learn with Siva
                </a>{' '}
                · Part of the Cross-Border Payments Series
            </footer>
        </Container>
    )
}
