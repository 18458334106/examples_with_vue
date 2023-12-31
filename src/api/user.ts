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

export const queryUserList = (params:any) => {
    return request({
        url: '/user/list',
        method: 'get',
        params
    })
}

export const queryChatRecode = (data:any) => {
    return request({
        url: '/chat/recode',
        method: 'post',
        data
    })
}