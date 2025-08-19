import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    ArrowRight,
    Bitcoin,
    ShieldCheck,
    Repeat,
    Webhook,
    Coins,
    CheckCircle2,
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Donor Node · Recurring Bitcoin Donation Platform',
    description:
        'Run recurring Bitcoin donations with accurate accounting, reliable webhooks, and professional testing. Next.js + TypeScript + Postgres + BullMQ.',
}

export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
            {/* Header / Nav */}
            <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                            <Bitcoin className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight group-hover:opacity-90">
                            Donor Node
                        </span>
                    </Link>

                    <nav className="flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" className="px-4">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="px-4">Register</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.06),rgba(255,255,255,0))]" />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
                    <div>
                        <span className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
                            Recurring Bitcoin Donations
                        </span>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                            A reliable way to run recurring Bitcoin donations
                        </h1>
                        <p className="mt-4 max-w-prose text-slate-600">
                            A Next.js + Node.js platform that generates
                            per-invoice Taproot addresses, tracks mempool and
                            confirmations, and posts HMAC-signed webhooks. Uses
                            a double-entry ledger, strict sats handling, and
                            audited FX snapshots.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link href="/register">
                                <Button className="group">
                                    Get started
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline">
                                    I already have an account
                                </Button>
                            </Link>
                            <Link
                                href="/campaigns/demo"
                                className="text-sm text-slate-600 underline underline-offset-4">
                                View demo campaign
                            </Link>
                        </div>

                        <ul className="mt-6 space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />{' '}
                                Runs free locally with Docker (Postgres +
                                Redis).
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />{' '}
                                Public APIs: mempool.space and CoinGecko.
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />{' '}
                                Optional Bitcoin Core RPC behind a feature flag.
                            </li>
                        </ul>
                    </div>

                    {/* Right: nice stat / code block card */}
                    <div className="relative">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-slate-900 p-2 text-white">
                                    <Webhook className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        HMAC-signed webhooks
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Retries + DLQ with BullMQ
                                    </p>
                                </div>
                            </div>

                            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] leading-relaxed text-slate-100">
                                <code>{`POST /api/webhooks/invoice
x-donornode-signature: t=1723970000, v1=af1b...

{
  "type": "invoice.confirmed",
  "data": {
    "invoiceId": "inv_82T6",
    "txid": "3a59e…",
    "confirmations": 1,
    "sats": 150000
  }
}`}</code>
                            </pre>

                            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                <div className="rounded-xl border border-slate-200 p-3">
                                    <p className="text-xs text-slate-500">
                                        Addresses
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        Taproot (BIP86)
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-3">
                                    <p className="text-xs text-slate-500">
                                        Money
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        Sats only
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-3">
                                    <p className="text-xs text-slate-500">
                                        Ledger
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        Double-entry
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t bg-slate-50/60">
                <div className="mx-auto max-w-6xl px-4 py-14">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Why Donor Node
                    </h2>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Feature
                            icon={<Repeat className="h-5 w-5" />}
                            title="Recurring pledges"
                            desc="Automatically schedule invoices and track payment state across mempool and confirmations."
                        />
                        <Feature
                            icon={<Bitcoin className="h-5 w-5" />}
                            title="Per-invoice addresses"
                            desc="Taproot (BIP86) address per invoice for clean reconciliation and privacy."
                        />
                        <Feature
                            icon={<ShieldCheck className="h-5 w-5" />}
                            title="Ledger you can trust"
                            desc="Double-entry accounting in Postgres with strict integer handling (sats only)."
                        />
                        <Feature
                            icon={<Webhook className="h-5 w-5" />}
                            title="Durable webhooks"
                            desc="HMAC-signed, retried with dead-letter queues powered by BullMQ."
                        />
                        <Feature
                            icon={<Coins className="h-5 w-5" />}
                            title="Audited FX snapshots"
                            desc="Snapshot rates from CoinGecko for reporting without float errors."
                        />
                        <Feature
                            icon={<CheckCircle2 className="h-5 w-5" />}
                            title="CI-grade tests"
                            desc="Unit, integration, and contract tests to keep releases stable."
                        />
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-4 py-14">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Tech Stack
                    </h2>
                    <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                        {[
                            'Next.js (App Router)',
                            'React',
                            'TypeScript',
                            'Tailwind CSS',
                            'Node.js',
                            'Postgres 15+',
                            'Drizzle ORM',
                            'BullMQ + Redis',
                            'mempool.space',
                            'CoinGecko',
                            'Vitest/Jest + Pact',
                        ].map(chip => (
                            <li
                                key={chip}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                                {chip}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Final CTA */}
            <section className="border-t bg-slate-50">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
                    <h3 className="text-2xl font-semibold">
                        Ready to accept recurring Bitcoin donations?
                    </h3>
                    <p className="max-w-2xl text-slate-600">
                        Create an account to configure your first campaign,
                        generate invoices, and receive webhooks in minutes.
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                        <Link href="/register">
                            <Button>Register</Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Donor Node</p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/campaigns/demo"
                            className="hover:underline">
                            Demo
                        </Link>
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link href="/register" className="hover:underline">
                            Register
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    )
}

function Feature({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode
    title: string
    desc: string
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-slate-900 p-2 text-white">
                    {icon}
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-slate-600">{desc}</p>
        </div>
    )
}
