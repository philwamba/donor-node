import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
    baseURL: '/api',
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers = new AxiosHeaders(config.headers)
            config.headers.set('Authorization', `Bearer ${token}`)
        }
    }
    return config
})
