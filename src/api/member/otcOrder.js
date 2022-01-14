import request from '@/utils/request'

// 查询OtcOrder列表
export function listOtcOrder(query) {
return request({
url: '/api/v1/otcOrderList',
method: 'get',
params: query
})
}

// 查询OtcOrder详细
export function getOtcOrder (orderId) {
return request({
url: '/api/v1/otcOrder/' + orderId,
method: 'get'
})
}

// 查询佣金
export function getCommission (id) {
    return request({
    url: '/api/v1/otcOrderCommission/' + id,
    method: 'get'
    })
}


// 新增OtcOrder
export function addOtcOrder(data) {
return request({
url: '/api/v1/otcOrder',
method: 'post',
data: data
})
}

// 修改OtcOrder
export function updateOtcOrder(data) {
return request({
url: '/api/v1/otcOrder',
method: 'put',
data: data
})
}

// 删除OtcOrder
export function delOtcOrder(orderId) {
return request({
url: '/api/v1/otcOrder/' + orderId,
method: 'delete'
})
}
