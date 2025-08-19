'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'

interface Invoice {
    id: number | string
    amount: number
    status: string
}

export default function AdminInvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const fetchInvoices = async () => {
        setLoading(true)
        try {
            const query = statusFilter ? `?status=${statusFilter}` : ''
            const res = await api.get(`/invoices${query}`)
            setInvoices(res.data ?? [])
        } catch (err) {
            console.error(err)
            setInvoices([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [statusFilter])

    const columns = [
        { header: 'ID', accessor: 'id' as const },
        { header: 'Amount', accessor: (row: Invoice) => row.amount ?? '—' },
        { header: 'Status', accessor: 'status' as const },
    ]

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <div className="flex items-center space-x-2">
                    <label
                        htmlFor="status"
                        className="text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Spinner className="h-6 w-6" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={invoices}
                        emptyMessage="No invoices found"
                        getRowKey={row => row.id}
                    />
                )}
            </CardContent>
        </Card>
    )
}
