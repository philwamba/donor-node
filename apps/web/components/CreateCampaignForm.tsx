'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { campaignSchema } from '@/lib/validators'
import { api } from '@/lib/axios'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import clsx from 'clsx'
import * as yup from 'yup'
import type { Resolver } from 'react-hook-form'

type CampaignFormValues = yup.InferType<typeof campaignSchema>

export default function CreateCampaignForm({
    onSuccess,
}: {
    onSuccess?: () => void
}) {
    const [apiError, setApiError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CampaignFormValues>({
        resolver: yupResolver<CampaignFormValues, any, CampaignFormValues>(
            campaignSchema,
        ) as Resolver<CampaignFormValues>,
        defaultValues: { name: '', slug: '', description: '' },
    })

    const onSubmit = async (values: CampaignFormValues) => {
        setApiError(null)
        try {
            await api.post('/campaigns', values)
            reset()
            onSuccess?.()
        } catch (err) {
            console.error(err)
            setApiError('Failed to create campaign')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Campaign name"
                    aria-invalid={!!errors.name}
                    className={clsx(
                        errors.name && 'border-red-500 focus:ring-red-500',
                    )}
                    {...register('name')}
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Slug */}
            <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    placeholder="unique-slug"
                    aria-invalid={!!errors.slug}
                    className={clsx(
                        errors.slug && 'border-red-500 focus:ring-red-500',
                    )}
                    {...register('slug')}
                />
                {errors.slug && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.slug.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={3}
                    placeholder="Describe the campaign"
                    aria-invalid={!!errors.description}
                    className={clsx(
                        errors.description &&
                            'border-red-500 focus:ring-red-500',
                    )}
                    {...register('description')}
                />
                {errors.description && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {apiError && <p className="text-sm text-red-600">{apiError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating…' : 'Create Campaign'}
            </Button>
        </form>
    )
}
