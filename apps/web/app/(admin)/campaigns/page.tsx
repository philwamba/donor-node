'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { DataTable, type Column } from '@/components/ui/data-table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import CreateCampaignForm from '@/components/CreateCampaignForm'

interface Campaign {
    id: number
    name: string
    slug: string
    description?: string
}

export default function AdminCampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showForm, setShowForm] = useState<boolean>(false)

    const fetchCampaigns = async () => {
        setLoading(true)
        try {
            const res = await api.get('/campaigns')
            setCampaigns(res.data ?? [])
        } catch (err) {
            console.error(err)
            setCampaigns([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCampaigns()
    }, [])

    const columns = [
        { header: 'ID', accessor: 'id' as const },
        { header: 'Name', accessor: 'name' as const },
        { header: 'Slug', accessor: 'slug' as const },
        {
            header: 'Description',
            accessor: (row: Campaign) => row.description || '—',
        },
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Campaigns</CardTitle>
                    <Button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Close' : 'New Campaign'}
                    </Button>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={campaigns}
                            emptyMessage="No campaigns yet"
                            getRowKey={row => row.id}
                        />
                    )}
                </CardContent>
            </Card>
            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create a New Campaign</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateCampaignForm onSuccess={fetchCampaigns} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
