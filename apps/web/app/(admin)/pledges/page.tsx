'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'
import CreatePledgeForm from '@/components/CreatePledgeForm'

interface CampaignSimple {
    id: number
    name: string
}

export default function AdminPledgesPage() {
    const [campaigns, setCampaigns] = useState<CampaignSimple[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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

    type PledgeRow = { id: string | number; placeholder: string }
    const pledgeColumns: Column<PledgeRow>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Info', accessor: 'placeholder' },
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Pledge</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : (
                        <CreatePledgeForm campaigns={campaigns} />
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pledges</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={pledgeColumns}
                        data={[]}
                        emptyMessage="Pledges listing coming soon"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
