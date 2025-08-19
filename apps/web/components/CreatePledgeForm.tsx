'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { pledgeSchema } from '@/lib/validators'
import { api } from '@/lib/axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CreatePledgeFormProps {
    campaigns: { id: number; name: string }[]
    onSuccess?: () => void
}

interface PledgeFormValues {
    donorId: number
    campaignId: number
    amount: number
    recurrence: 'weekly' | 'monthly' | 'annual'
}

export default function CreatePledgeForm({
    campaigns,
    onSuccess,
}: CreatePledgeFormProps) {
    const [apiError, setApiError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PledgeFormValues>({
        resolver: yupResolver(pledgeSchema),
    })

    const onSubmit = async (values: PledgeFormValues) => {
        setApiError(null)
        try {
            await api.post('/pledges', {
                donorId: Number(values.donorId),
                campaignId: Number(values.campaignId),
                amount: Number(values.amount),
                recurrence: values.recurrence,
            })
            reset()
            onSuccess?.()
        } catch (err) {
            console.error(err)
            setApiError('Failed to create pledge')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Donor ID */}
            <div>
                <Label htmlFor="donorId">Donor ID</Label>
                <Input
                    id="donorId"
                    type="number"
                    aria-invalid={!!errors.donorId}
                    {...register('donorId')}
                />
                {errors.donorId && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.donorId.message}
                    </p>
                )}
            </div>

            {/* Campaign */}
            <div>
                <Label htmlFor="campaignId">Campaign</Label>
                <select
                    id="campaignId"
                    {...register('campaignId')}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select campaign</option>
                    {campaigns.map(camp => (
                        <option key={camp.id} value={camp.id}>
                            {camp.name}
                        </option>
                    ))}
                </select>
                {errors.campaignId && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.campaignId.message}
                    </p>
                )}
            </div>

            {/* Amount */}
            <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    aria-invalid={!!errors.amount}
                    {...register('amount')}
                />
                {errors.amount && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* Recurrence */}
            <div>
                <Label htmlFor="recurrence">Recurrence</Label>
                <select
                    id="recurrence"
                    {...register('recurrence')}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select recurrence</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                </select>
                {errors.recurrence && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.recurrence.message}
                    </p>
                )}
            </div>

            {apiError && <p className="text-sm text-red-600">{apiError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating…' : 'Create Pledge'}
            </Button>
        </form>
    )
}
