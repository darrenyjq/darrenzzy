import request from '@/utils/request'

// 查询OtcAppeal列表
export function listOtcAppeal(query) {
return request({
url: '/api/v1/otcAppealList',
method: 'get',
params: query
})
}

// 查询OtcAppeal详细
export function getOtcAppeal (orderId) {
return request({
url: '/api/v1/otcAppeal/' + orderId,
method: 'get'
})
}

// 修改OtcAppeal
export function updateOtcAppeal(data) {
return request({
url: '/api/v1/otcAppeal',
method: 'put',
data: data
})
}

