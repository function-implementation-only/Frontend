import axios, {
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'

type CustomResponseFormat<T = any> = {
    response: T
    refreshedToken?: string
}
export interface ClientInstance extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig | { headers: any }>
        response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>
    }
    getUri(config?: AxiosRequestConfig): string
    request<T>(config: AxiosRequestConfig): Promise<T>
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    options<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

const client: ClientInstance = axios.create({
    baseURL: '/api',
})

client.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Access_Token = token
    }

    return request
})

client.interceptors.response.use((resp) => {
    if (resp.data?.refreshedToken) {
        localStorage.setItem('refreshedToken', resp.data.refreshedToken)
    }
    return resp
})

export default client
