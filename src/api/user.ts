import request from '@/utils/request'

export const login = (data:any) => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export const getInfo = () => {
    return request({
        url: '/user/info',
        method: 'get'
    })
}