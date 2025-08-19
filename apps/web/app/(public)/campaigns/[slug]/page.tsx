'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Bitcoin,
    QrCode,
    Copy,
    Check,
    Repeat,
    Clock,
    Info,
    ArrowLeft,
    ArrowRight,
} from 'lucide-react'

type Recurrence = 'one_time' | 'monthly' | 'quarterly'
type Currency = 'USD' | 'SAT'

/**
 * Demo helper: return a deterministic fake Taproot address per slug.
 * Replace with your API call to fetch a real per-invoice address.
 */
function demoAddressFor(slug: string) {
    // Real Taproot address would be programmatically generated per invoice (BIP86).
    // Using a believable placeholder for demo.
    const base = 'bc1p'
    const hash = Array.from(slug).reduce(
        (a, c) => (a * 33 + c.charCodeAt(0)) >>> 0,
        7,
    )
    const tail = (hash.toString(36) + 'x'.repeat(30)).slice(0, 30)
    return `${base}${tail}`
}

/**
 * Very simple FX estimate just for demo UX (no network calls).
 * Replace with your server-side FX snapshot for production.
 */
function usdToSats(usd: number, btcUsd = 60000) {
    const btc = usd / btcUsd
    return Math.round(btc * 100_000_000) // sats
}
function satsToUsd(sats: number, btcUsd = 60000) {
    const btc = sats / 100_000_000
    return Math.round(btc * btcUsd)
}

export default function CampaignPage() {
    const router = useRouter()
    const { slug } = useParams<{ slug: string }>()

    const [currency, setCurrency] = useState<Currency>('USD')
    const [recurrence, setRecurrence] = useState<Recurrence>('monthly')
    const [amountUsd, setAmountUsd] = useState<number>(25)
    const [customUsd, setCustomUsd] = useState<string>('')

    const [invoiceOpen, setInvoiceOpen] = useState(false)
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
    const [copied, setCopied] = useState<'addr' | 'amt' | null>(null)

    const address = useMemo(() => demoAddressFor(slug), [slug])

    // Suggested presets (USD)
    const presets = [5, 10, 25, 50, 100]

    // Normalized amounts (for URI + display)
    const sats = useMemo(() => usdToSats(amountUsd), [amountUsd])
    const btc = useMemo(() => sats / 100_000_000, [sats])
    const paymentUri = useMemo(() => {
        // BIP21-ish: bitcoin:<address>?amount=<btc>&label=<label>
        const label = encodeURIComponent(`Donor Node - ${slug} (${recurrence})`)
        const amountParam = btc.toFixed(8).replace(/0+$/, '').replace(/\.$/, '') 
        return `bitcoin:${address}?amount=${amountParam}&label=${label}`
    }, [address, btc, slug, recurrence])

    // Generate QR when invoice opens
    useEffect(() => {
        if (!invoiceOpen) return
        let cancelled = false
        ;(async () => {
            try {
                const QR = await import('qrcode')
                const url = await QR.toDataURL(paymentUri, {
                    width: 240,
                    margin: 1,
                })
                if (!cancelled) setQrDataUrl(url)
            } catch {
                // If the library isn't installed, show nothing; CTA still works via "Open in wallet"
                setQrDataUrl(null)
            }
        })()
        return () => {
            cancelled = true
            setQrDataUrl(null)
        }
    }, [invoiceOpen, paymentUri])

    const handleSelectPreset = (usd: number) => {
        setAmountUsd(usd)
        setCustomUsd('')
    }

    const handleCustomUsd = (v: string) => {
        setCustomUsd(v)
        const n = Number(v)
        if (!Number.isNaN(n) && n > 0) setAmountUsd(n)
    }

    const handleCopy = async (text: string, kind: 'addr' | 'amt') => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(kind)
            setTimeout(() => setCopied(null), 1200)
        } catch {
            // noop
        }
    }

    const openInvoice = () => setInvoiceOpen(true)
    const closeInvoice = () => setInvoiceOpen(false)

    // Demo stats (static)
    const raisedUsd = 18320
    const goalUsd = 25000
    const pct = Math.min(100, Math.round((raisedUsd / goalUsd) * 100))

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Top bar */}
            <div className="border-b bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="inline-flex items-center text-slate-600 hover:text-slate-900">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Link>
                        <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                            Campaign
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900">
                            Login
                        </Link>
                        <Link href="/register">
                            <Button className="h-8 px-3 text-sm">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
                {/* Left: Campaign body */}
                <div className="md:col-span-2">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                        <Bitcoin className="h-4 w-4 text-slate-900" />
                        Recurring Bitcoin Donations
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        {toTitle(slug)} — Clean Water Fund
                    </h1>

                    <p className="mt-3 max-w-prose text-slate-600">
                        Help us provide reliable clean water systems in rural
                        communities. Your monthly Bitcoin pledge funds
                        materials, local labor, and maintenance. We issue a
                        per-invoice Taproot address for privacy and clean
                        reconciliation, and we post HMAC-signed webhooks for
                        your backend.
                    </p>

                    {/* Progress */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Raised</p>
                                <p className="text-2xl font-semibold">
                                    ${num(raisedUsd)}{' '}
                                    <span className="text-sm font-normal text-slate-500">
                                        / ${num(goalUsd)}
                                    </span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-600">
                                    Progress
                                </p>
                                <p className="text-xl font-semibold">{pct}%</p>
                            </div>
                        </div>
                        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-slate-900"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            Demo figures. In production, calculate from ledger
                            entries.
                        </p>
                    </div>

                    {/* FAQ / Details */}
                    <div className="mt-6 space-y-3">
                        <Detail
                            icon={<Repeat className="h-4 w-4" />}
                            title="Recurring pledges"
                            text="Choose a recurrence. We schedule a new invoice each cycle with a per-invoice Taproot address."
                        />
                        <Detail
                            icon={<Clock className="h-4 w-4" />}
                            title="Confirmation handling"
                            text="We track mempool and on-chain confirmations, then fire HMAC-signed webhooks with retries."
                        />
                        <Detail
                            icon={<Info className="h-4 w-4" />}
                            title="Estimates only"
                            text="USD values shown are estimates for demo. Live FX snapshots should be taken server-side."
                        />
                    </div>
                </div>

                {/* Right: Donate card */}
                <aside className="md:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold">Donate</h2>

                        {/* Currency toggle */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <Button
                                type="button"
                                variant={
                                    currency === 'USD' ? 'default' : 'outline'
                                }
                                className="h-9"
                                onClick={() => setCurrency('USD')}>
                                USD
                            </Button>
                            <Button
                                type="button"
                                variant={
                                    currency === 'SAT' ? 'default' : 'outline'
                                }
                                className="h-9"
                                onClick={() => setCurrency('SAT')}>
                                Sats
                            </Button>
                        </div>

                        {/* Presets */}
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {presets.map(p => {
                                const active = amountUsd === p
                                const label =
                                    currency === 'USD'
                                        ? `$${p}`
                                        : `${num(usdToSats(p))} sats`
                                return (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => handleSelectPreset(p)}
                                        className={[
                                            'rounded-xl border px-3 py-2 text-sm',
                                            active
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300',
                                        ].join(' ')}
                                        aria-pressed={active}>
                                        {label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Custom amount */}
                        <div className="mt-3">
                            <label
                                htmlFor="amount"
                                className="mb-1 block text-xs font-medium text-slate-600">
                                Custom amount ({currency})
                            </label>
                            {currency === 'USD' ? (
                                <Input
                                    id="amount"
                                    type="number"
                                    inputMode="decimal"
                                    min={1}
                                    step="1"
                                    placeholder="e.g. 25"
                                    value={customUsd}
                                    onChange={e =>
                                        handleCustomUsd(e.target.value)
                                    }
                                />
                            ) : (
                                <Input
                                    id="amount"
                                    type="number"
                                    inputMode="numeric"
                                    min={1000}
                                    step="100"
                                    placeholder={`${num(usdToSats(25))} (≈$25)`}
                                    onChange={e => {
                                        const n = Number(e.target.value)
                                        if (!Number.isNaN(n) && n > 0) {
                                            setAmountUsd(
                                                Math.max(1, satsToUsd(n)),
                                            )
                                            setCustomUsd('')
                                        }
                                    }}
                                />
                            )}
                            <p className="mt-1.5 text-xs text-slate-500">
                                You will pay to a unique Taproot address for
                                this invoice.
                            </p>
                        </div>

                        {/* Recurrence */}
                        <div className="mt-4">
                            <p className="mb-1 text-xs font-medium text-slate-600">
                                Recurrence
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {(
                                    [
                                        ['one_time', 'One-time'],
                                        ['monthly', 'Monthly'],
                                        ['quarterly', 'Quarterly'],
                                    ] as const
                                ).map(([key, label]) => {
                                    const active = recurrence === key
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setRecurrence(key)}
                                            className={[
                                                'rounded-xl border px-3 py-2 text-sm',
                                                active
                                                    ? 'border-slate-900 bg-slate-900 text-white'
                                                    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300',
                                            ].join(' ')}
                                            aria-pressed={active}>
                                            {label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Address preview */}
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-xs text-slate-600">
                                Invoice address (demo)
                            </p>
                            <p className="mt-1 truncate font-mono text-sm">
                                {address}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-8 px-2"
                                    onClick={() => handleCopy(address, 'addr')}>
                                    {copied === 'addr' ? (
                                        <Check className="mr-1.5 h-4 w-4" />
                                    ) : (
                                        <Copy className="mr-1.5 h-4 w-4" />
                                    )}
                                    Copy
                                </Button>
                                <Link
                                    href={`https://mempool.space/address/${address}`}
                                    target="_blank"
                                    className="text-xs text-slate-600 underline underline-offset-4 hover:text-slate-900">
                                    View on mempool.space
                                </Link>
                            </div>
                        </div>

                        {/* Primary CTA */}
                        <Button
                            type="button"
                            className="mt-5 w-full"
                            onClick={openInvoice}>
                            Generate invoice{' '}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <p className="mt-2 text-center text-[11px] text-slate-500">
                            By continuing you agree that USD values are
                            estimates. The on-chain amount is exact in BTC.
                        </p>
                    </div>
                </aside>
            </section>

            {/* Invoice modal */}
            {invoiceOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
                    role="dialog"
                    aria-modal="true">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-slate-900 p-1.5 text-white">
                                    <QrCode className="h-4 w-4" />
                                </div>
                                <h3 className="text-base font-semibold">
                                    Pay invoice
                                </h3>
                            </div>
                            <button
                                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                                onClick={closeInvoice}
                                aria-label="Close">
                                ✕
                            </button>
                        </div>

                        {/* QR + details */}
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                                {qrDataUrl ? (
                                    <img
                                        src={qrDataUrl}
                                        alt="Payment QR"
                                        className="h-48 w-48"
                                    />
                                ) : (
                                    <div className="flex h-48 w-48 flex-col items-center justify-center text-slate-500">
                                        <QrCode className="h-10 w-10" />
                                        <p className="mt-2 text-xs text-center">
                                            QR unavailable. Ensure{' '}
                                            <code>qrcode</code> is installed.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <table className="w-full text-sm">
                                    <tbody>
                                        <Row label="To address">
                                            <span className="block truncate font-mono">
                                                {address}
                                            </span>
                                        </Row>
                                        <Row label="Amount (BTC)">
                                            <span className="font-mono">
                                                {btc.toFixed(8)}
                                            </span>
                                            <Button
                                                variant="outline"
                                                className="ml-2 h-7 px-2"
                                                onClick={() =>
                                                    handleCopy(
                                                        btc.toFixed(8),
                                                        'amt',
                                                    )
                                                }>
                                                {copied === 'amt' ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </Row>
                                        <Row label="Amount (sats)">
                                            <span className="font-mono">
                                                {num(sats)}
                                            </span>
                                        </Row>
                                        <Row label="Approx. USD">
                                            <span className="font-mono">
                                                ${num(amountUsd)}
                                            </span>
                                        </Row>
                                        <Row label="Recurrence">
                                            <span className="capitalize">
                                                {recurrence.replace('_', ' ')}
                                            </span>
                                        </Row>
                                    </tbody>
                                </table>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <a
                                        href={paymentUri}
                                        className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                                        Open in wallet
                                    </a>
                                    <a
                                        href={`https://mempool.space/address/${address}`}
                                        target="_blank"
                                        className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                                        View address
                                    </a>
                                </div>

                                <p className="mt-3 text-[11px] text-slate-500">
                                    Scan the QR with any Bitcoin wallet that
                                    supports BIP21. Amount is exact in BTC; USD
                                    is an estimate.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

/* ---------- small presentational bits ---------- */

function Row({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <tr className="align-top">
            <td className="py-1 pr-3 text-slate-500">{label}</td>
            <td className="py-1">{children}</td>
        </tr>
    )
}

function Detail({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode
    title: string
    text: string
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
                <div className="rounded-lg bg-slate-900 p-1.5 text-white">
                    {icon}
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-slate-600">{text}</p>
        </div>
    )
}

function toTitle(slug: string) {
    return slug
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase())
}

function num(n: number) {
    return new Intl.NumberFormat().format(n)
}
