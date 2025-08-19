import { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'admin',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const username = credentials?.username
                const password = credentials?.password
                if (
                    username === 'admin' &&
                    password &&
                    process.env.ADMIN_TOKEN &&
                    password === process.env.ADMIN_TOKEN
                ) {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: 'admin@example.com',
                    }
                }
                return null
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions