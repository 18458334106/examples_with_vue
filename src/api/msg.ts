import request from '@/utils/request'

export const getMsgList = (params?: any) => request({
    url: '/user_message/get_messageList',
    method: 'get',
    params
})

export const addMsg = (params: any) => request({
    url: '/user_message/add_message',
    method: 'get',
    params
})

export const delMsg = (params: any) => request({
    url: '/user_message/del_message',
    method: 'get',
    params
})