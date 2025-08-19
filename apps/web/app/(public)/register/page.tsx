'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Bitcoin, Eye, EyeOff } from 'lucide-react'

type RegisterFormValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
    // terms: boolean  // uncomment if you want a checkbox
}

const registerSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .matches(
            /^[a-z0-9-_]+$/i,
            'Only letters, numbers, dashes, and underscores',
        ),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'At least 8 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    // terms: yup.boolean().isTrue('You must accept the terms'),
})

export default function RegisterPage() {
    const router = useRouter()
    const [formError, setFormError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver<RegisterFormValues, any, RegisterFormValues>(
            registerSchema,
        ),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: RegisterFormValues) => {
        setFormError(null)
        // 1) Create account on your backend
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        })

        if (!res.ok) {
            const msg =
                (await res.json().catch(() => ({})))?.error ??
                'Registration failed'
            setFormError(msg)
            return
        }

        // 2) Auto-login via NextAuth Credentials (optional)
        const login = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
        })
        if (login?.error) {
            // If automatic login fails, let the user log in manually
            router.push('/login')
            return
        }

        router.push('/dashboard')
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Top bar */}
            <div className="border-b bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-600 hover:text-slate-900">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Home
                    </Link>
                    <div className="inline-flex items-center gap-2 text-slate-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
                            <Bitcoin className="h-4 w-4" />
                        </span>
                        <span className="font-semibold">Donor Node</span>
                    </div>
                </div>
            </div>

            {/* Card */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2">
                <section className="hidden rounded-2xl border border-slate-200 bg-white p-6 md:block">
                    <h2 className="text-xl font-semibold">
                        Create your account
                    </h2>
                    <p className="mt-2 text-slate-600">
                        Start a campaign, generate invoices, and receive
                        on-chain donations with clean accounting.
                    </p>
                    <div className="mt-4 h-40 rounded-xl bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.06),rgba(255,255,255,0))]" />
                    <ul className="mt-4 list-inside list-disc text-sm text-slate-600">
                        <li>Per-invoice Taproot addresses</li>
                        <li>HMAC-signed webhooks</li>
                        <li>Sats-only, double-entry ledger</li>
                    </ul>
                </section>

                <section className="mx-auto w-full max-w-md">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Register
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-slate-900 underline underline-offset-4">
                                Log in
                            </Link>
                            .
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-6 space-y-4">
                            {/* Username */}
                            <div className="space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="your-username"
                                    autoComplete="username"
                                    aria-invalid={
                                        errors.username ? 'true' : 'false'
                                    }
                                    aria-describedby={
                                        errors.username
                                            ? 'username-error'
                                            : undefined
                                    }
                                    {...register('username')}
                                />
                                {errors.username && (
                                    <p
                                        id="username-error"
                                        className="text-sm text-red-600">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    aria-invalid={
                                        errors.email ? 'true' : 'false'
                                    }
                                    aria-describedby={
                                        errors.email ? 'email-error' : undefined
                                    }
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p
                                        id="email-error"
                                        className="text-sm text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            errors.password ? 'true' : 'false'
                                        }
                                        aria-describedby={
                                            errors.password
                                                ? 'password-error'
                                                : undefined
                                        }
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(s => !s)}
                                        className="absolute inset-y-0 right-2 inline-flex items-center rounded-md p-2 text-slate-500 hover:bg-slate-100"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }>
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p
                                        id="password-error"
                                        className="text-sm text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="confirmPassword">
                                    Confirm password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            errors.confirmPassword
                                                ? 'true'
                                                : 'false'
                                        }
                                        aria-describedby={
                                            errors.confirmPassword
                                                ? 'confirm-error'
                                                : undefined
                                        }
                                        {...register('confirmPassword')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(s => !s)}
                                        className="absolute inset-y-0 right-2 inline-flex items-center rounded-md p-2 text-slate-500 hover:bg-slate-100"
                                        aria-label={
                                            showConfirm
                                                ? 'Hide password'
                                                : 'Show password'
                                        }>
                                        {showConfirm ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p
                                        id="confirm-error"
                                        className="text-sm text-red-600">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            Terms (optional)
              <div className="flex items-center gap-2 text-sm">
                <input id="terms" type="checkbox" {...register('terms')} />
                <label htmlFor="terms" className="text-slate-600">
                  I agree to the <a className="underline" href="/terms">Terms</a> and <a className="underline" href="/privacy">Privacy</a>.
                </label>
                {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}
              </div>

                            {formError && (
                                <p className="text-sm text-red-600">
                                    {formError}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                disabled={isSubmitting}>
                                {isSubmitting && (
                                    <svg
                                        className="mr-2 inline h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            opacity="0.25"
                                        />
                                        <path
                                            d="M22 12a10 10 0 0 1-10 10"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                                {isSubmitting
                                    ? 'Creating account…'
                                    : 'Create account'}
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <Link
                                    href="/campaigns/demo"
                                    className="text-slate-600 underline underline-offset-4">
                                    View demo campaign
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-slate-600 underline underline-offset-4">
                                    I already have an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}
