'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Check,
    Copy,
    ExternalLink,
    QrCode,
    Clock,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react'

type InvoiceStatus =
    | 'unpaid'
    | 'pending'
    | 'confirmed'
    | 'expired'
    | 'cancelled'
type CopyTag = 'addr' | 'btc' | 'sats' | 'uri'

type Invoice = {
    id: string
    address: string
    sats: number
    usdEstimate: number
    status: InvoiceStatus
    createdAt: number
    expiresAt?: number
    confirmations: number
    txid?: string
    memo?: string
}

/* ---------- Utilities ---------- */
function num(n: number) {
    return new Intl.NumberFormat().format(n)
}
function trimBtc(n: number) {
    return n.toFixed(8).replace(/0+$/, '').replace(/\.$/, '')
}
function msToClock(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000))
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}
function demoAddressFor(id: string) {
    const base = 'bc1p'
    const hash = Array.from(id).reduce(
        (a, c) => (a * 33 + c.charCodeAt(0)) >>> 0,
        7,
    )
    const tail = (hash.toString(36) + 'x'.repeat(30)).slice(0, 30)
    return `${base}${tail}`
}
function satsToUsd(sats: number, btcUsd = 60000) {
    const btc = sats / 100_000_000
    return Math.round(btc * btcUsd)
}

/** Fetch invoice from API, fall back to a deterministic demo */
async function fetchInvoice(invoiceId: string): Promise<Invoice> {
    try {
        const res = await fetch(`/api/invoices/${invoiceId}`, {
            cache: 'no-store',
        })
        if (res.ok) return (await res.json()) as Invoice
    } catch {
        // ignore
    }
    const createdAt = Date.now() - 45_000
    const expiresAt = Date.now() + 10 * 60_000
    const sats = 150_000
    return {
        id: invoiceId,
        address: demoAddressFor(invoiceId),
        sats,
        usdEstimate: satsToUsd(sats),
        status: 'unpaid',
        createdAt,
        expiresAt,
        confirmations: 0,
        memo: 'Donor Node demo invoice',
    }
}

/** Demo-only auto-advance helper (remove when wired to backend) */
function bumpDemoStatus(base: Invoice, prev?: Invoice): Invoice {
    if (base.txid || base.status === 'confirmed' || prev?.txid) return base
    const age = Date.now() - base.createdAt
    if (age > 50_000)
        return {
            ...base,
            status: 'confirmed',
            confirmations: 1,
            txid: '3a59e…demo',
        }
    if (age > 20_000) return { ...base, status: 'pending' }
    return base
}

/* ---------- Page ---------- */
export default function InvoicePage() {
    const { invoiceId } = useParams<{ invoiceId: string }>() // use params, not props
    const [loading, setLoading] = useState(true)
    const [invoice, setInvoice] = useState<Invoice | null>(null)
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
    const [copied, setCopied] = useState<CopyTag | null>(null)
    const [now, setNow] = useState(Date.now())

    // Poll invoice
    useEffect(() => {
        if (!invoiceId) return
        let mounted = true
        const load = async () => {
            const fetched = await fetchInvoice(invoiceId)
            if (!mounted) return
            setInvoice(prev => bumpDemoStatus(fetched, prev))
            setLoading(false)
        }
        const interval = setInterval(load, 5000)
        load()
        return () => {
            mounted = false
            clearInterval(interval)
        }
    }, [invoiceId])

    // Tick for countdown
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(t)
    }, [])

    // Build payment URI & QR
    const btc = useMemo(
        () => (invoice ? invoice.sats / 100_000_000 : 0),
        [invoice],
    )
    const paymentUri = useMemo(() => {
        if (!invoice) return ''
        const label = encodeURIComponent(
            invoice.memo ?? `Donor Node Invoice ${invoice.id}`,
        )
        return `bitcoin:${invoice.address}?amount=${trimBtc(
            btc,
        )}&label=${label}`
    }, [invoice, btc])

    useEffect(() => {
        if (!invoice) return
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
                setQrDataUrl(null)
            }
        })()
        return () => {
            cancelled = true
            setQrDataUrl(null)
        }
    }, [paymentUri, invoice])

    const timeLeftMs = invoice?.expiresAt
        ? Math.max(0, invoice.expiresAt - now)
        : undefined
    const isExpired = invoice?.status === 'expired' || timeLeftMs === 0

    const onCopy = async (val: string, tag: CopyTag) => {
        try {
            await navigator.clipboard.writeText(val)
            setCopied(tag)
            setTimeout(() => setCopied(null), 1200)
        } catch {
            // noop
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Top bar */}
            <div className="border-b bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-600 hover:text-slate-900">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Home
                    </Link>
                    <span className="text-xs text-slate-500">
                        Invoice ID: {invoiceId}
                    </span>
                </div>
            </div>

            <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
                {/* Left: details */}
                <div className="md:col-span-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Pay invoice
                    </h1>
                    <p className="mt-1 text-slate-600">
                        Send the exact amount to the address below. This invoice
                        will update automatically.
                    </p>

                    {/* Status card */}
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <StatusBadge
                                    status={
                                        isExpired
                                            ? 'expired'
                                            : invoice?.status ?? 'unpaid'
                                    }
                                />
                                {invoice?.txid && (
                                    <a
                                        href={`https://mempool.space/tx/${invoice.txid}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900">
                                        View transaction{' '}
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>
                            {typeof timeLeftMs === 'number' && !isExpired && (
                                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                                    <Clock className="h-4 w-4" />
                                    Expires in{' '}
                                    <span className="font-mono">
                                        {msToClock(timeLeftMs)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Amounts */}
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <KV label="Amount (BTC)">
                                <span className="font-mono">
                                    {invoice ? trimBtc(btc) : '—'}
                                </span>
                                {invoice && (
                                    <Button
                                        variant="outline"
                                        className="ml-2 h-7 px-2"
                                        onClick={() =>
                                            onCopy(trimBtc(btc), 'btc')
                                        }>
                                        {copied === 'btc' ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                )}
                            </KV>
                            <KV label="Amount (sats)">
                                <span className="font-mono">
                                    {invoice ? num(invoice.sats) : '—'}
                                </span>
                                {invoice && (
                                    <Button
                                        variant="outline"
                                        className="ml-2 h-7 px-2"
                                        onClick={() =>
                                            onCopy(String(invoice.sats), 'sats')
                                        }>
                                        {copied === 'sats' ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                )}
                            </KV>
                            <KV label="Approx. USD">
                                <span className="font-mono">
                                    {invoice
                                        ? `$${num(invoice.usdEstimate)}`
                                        : '—'}
                                </span>
                            </KV>
                        </div>

                        {/* Address */}
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-xs text-slate-600">
                                Pay to address
                            </p>
                            <p className="mt-1 truncate font-mono text-sm">
                                {invoice?.address ?? '—'}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                {invoice && (
                                    <Button
                                        variant="outline"
                                        className="h-8 px-2"
                                        onClick={() =>
                                            onCopy(invoice.address, 'addr')
                                        }>
                                        {copied === 'addr' ? (
                                            <Check className="mr-1.5 h-4 w-4" />
                                        ) : (
                                            <Copy className="mr-1.5 h-4 w-4" />
                                        )}
                                        Copy
                                    </Button>
                                )}
                                {invoice && (
                                    <a
                                        href={`https://mempool.space/address/${invoice.address}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-slate-600 underline underline-offset-4 hover:text-slate-900">
                                        View on mempool.space
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Warnings */}
                        {isExpired && (
                            <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                                <AlertTriangle className="mt-0.5 h-4 w-4" />
                                This invoice has expired. Generate a new one
                                from the campaign page.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: QR & actions */}
                <aside className="md:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold">Scan to pay</h2>
                        <div className="mt-3 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                            {loading ? (
                                <div className="h-48 w-48 animate-pulse rounded-xl bg-slate-200" />
                            ) : qrDataUrl ? (
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

                        {/* Open in wallet */}
                        <div className="mt-3">
                            <a
                                href={paymentUri || '#'}
                                className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                                Open in wallet
                            </a>
                            <Button
                                variant="outline"
                                className="mt-2 w-full"
                                onClick={() => onCopy(paymentUri, 'uri')}
                                disabled={!paymentUri}>
                                {copied === 'uri' ? (
                                    <Check className="mr-2 h-4 w-4" />
                                ) : (
                                    <Copy className="mr-2 h-4 w-4" />
                                )}
                                Copy payment URI
                            </Button>
                        </div>

                        {/* Confirmation hint */}
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                            <p className="mb-1 flex items-center gap-1 font-medium text-slate-700">
                                <CheckCircle2 className="h-4 w-4" /> After you
                                pay
                            </p>
                            <ol className="list-inside list-decimal space-y-0.5">
                                <li>
                                    We see your transaction in the mempool
                                    (Pending).
                                </li>
                                <li>
                                    After 1 block confirmation, your invoice is
                                    Confirmed.
                                </li>
                                <li>
                                    Webhooks notify your backend automatically.
                                </li>
                            </ol>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}

/* ---------- Presentational bits ---------- */
function StatusBadge({ status }: { status: InvoiceStatus }) {
    const map: Record<InvoiceStatus, { label: string; className: string }> = {
        unpaid: {
            label: 'Awaiting payment',
            className: 'bg-blue-50 text-blue-800 border border-blue-200',
        },
        pending: {
            label: 'Pending (in mempool)',
            className: 'bg-amber-50 text-amber-800 border border-amber-200',
        },
        confirmed: {
            label: 'Confirmed',
            className:
                'bg-emerald-50 text-emerald-800 border border-emerald-200',
        },
        expired: {
            label: 'Expired',
            className: 'bg-slate-100 text-slate-700 border border-slate-200',
        },
        cancelled: {
            label: 'Cancelled',
            className: 'bg-rose-50 text-rose-800 border border-rose-200',
        },
    }
    const { label, className } = map[status]
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${className}`}>
            <span
                className={[
                    'h-2 w-2 rounded-full',
                    status === 'unpaid' && 'bg-blue-500',
                    status === 'pending' && 'bg-amber-500',
                    status === 'confirmed' && 'bg-emerald-500',
                    status === 'expired' && 'bg-slate-400',
                    status === 'cancelled' && 'bg-rose-500',
                ]
                    .filter(Boolean)
                    .join(' ')}
            />
            {label}
            {status === 'pending' && (
                <span className="ml-1 inline-block h-3 w-3 animate-pulse rounded-full bg-amber-500/70" />
            )}
        </span>
    )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{label}</p>
            <div className="mt-1 flex items-center">{children}</div>
        </div>
    )
}
