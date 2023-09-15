import axios from 'axios'
// @ts-ignore
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'

const instance = axios.create({
    baseURL: 'https://flask-py.vercel.app',
    timeout: 5000
})

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}

instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + getToken()
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            ElMessage({
                message: res.msg || '',
                type: 'success',
                duration: 5 * 1000
            })
            return res.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default instance
