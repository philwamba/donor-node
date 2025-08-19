'use client'

import { useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import WebhookAttemptsTable from '@/components/WebhookAttemptsTable'

interface Attempt {
    timestamp: string
    status: string
}

export default function AdminWebhooksPage() {
    const [attempts, setAttempts] = useState<Attempt[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)

    const sendTestWebhook = async () => {
        setLoading(true)
        setMessage(null)
        try {
            const res = await api.post('/webhooks/test')
            const status =
                res.status === 200 ? 'success' : `error ${res.status}`
            setAttempts(prev => [
                { timestamp: new Date().toISOString(), status },
                ...prev,
            ])
            setMessage('Test webhook sent')
        } catch (err) {
            console.error(err)
            setAttempts(prev => [
                { timestamp: new Date().toISOString(), status: 'failed' },
                ...prev,
            ])
            setMessage('Test webhook failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Send Test Webhook</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        Trigger a signed webhook event to verify your endpoint
                        integration.
                    </p>
                    <Button onClick={sendTestWebhook}>
                        {loading ? 'Sending…' : 'Send Test Webhook'}
                    </Button>
                    {message && (
                        <p className="text-sm text-gray-700">{message}</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                    {attempts.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No attempts yet.
                        </p>
                    ) : (
                        <WebhookAttemptsTable attempts={attempts} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
