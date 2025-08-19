import * as yup from 'yup'

export const campaignSchema = yup.object({
    name: yup.string().required('Name is required'),
    slug: yup
        .string()
        .matches(
            /^[a-z0-9-]+$/,
            'Slug must be lowercase, alphanumeric and hyphens',
        )
        .required('Slug is required'),
    description: yup.string().optional(),
})

export const pledgeSchema = yup.object({
    donorId: yup
        .number()
        .typeError('Donor ID must be a number')
        .required('Donor ID is required'),
    campaignId: yup
        .number()
        .typeError('Campaign ID must be a number')
        .required('Campaign ID is required'),
    amount: yup
        .number()
        .positive('Amount must be positive')
        .required('Amount is required'),
    recurrence: yup
        .mixed<'weekly' | 'monthly' | 'annual'>()
        .oneOf(['weekly', 'monthly', 'annual'])
        .required('Recurrence is required'),
})

export const invoiceFilterSchema = yup.object({
    status: yup.string().oneOf(['pending', 'paid', 'expired', '']).optional(),
})
