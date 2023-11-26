import request from '@/utils/request'

export const getExamples = () => {
    return request({
        url: '/examples/getList',
        method: 'get'
    })
}