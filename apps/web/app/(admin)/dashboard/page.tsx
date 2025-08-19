'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { DataTable, type Column } from '@/components/ui/data-table'

interface Campaign {
    id: number
    name: string
    slug: string
}

interface Metric {
    label: string
    value: number
}

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            // Fetch campaigns for count and recent list
            const campaignsRes = await api.get('/campaigns')
            const campaigns: Campaign[] = campaignsRes.data ?? []
            // Fetch invoices by status
            const [pendingRes, paidRes, expiredRes] = await Promise.all([
                api.get('/invoices?status=pending'),
                api.get('/invoices?status=paid'),
                api.get('/invoices?status=expired'),
            ])
            setMetrics([
                { label: 'Campaigns', value: campaigns.length },
                {
                    label: 'Pending Invoices',
                    value: (pendingRes.data ?? []).length,
                },
                { label: 'Paid Invoices', value: (paidRes.data ?? []).length },
                {
                    label: 'Expired Invoices',
                    value: (expiredRes.data ?? []).length,
                },
            ])
            // Sort campaigns by id descending to approximate recency
            const sorted = [...campaigns].sort((a, b) => (a.id < b.id ? 1 : -1))
            setRecentCampaigns(sorted.slice(0, 5))
        } catch (err) {
            console.error(err)
            setMetrics([])
            setRecentCampaigns([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        { header: 'ID', accessor: 'id' as const },
        { header: 'Name', accessor: 'name' as const },
        { header: 'Slug', accessor: 'slug' as const },
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {metrics.map(m => (
                                <div
                                    key={m.label}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm text-center">
                                    <div className="text-sm font-medium text-gray-500">
                                        {m.label}
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold text-gray-900">
                                        {m.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={recentCampaigns}
                            emptyMessage="No campaigns"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
