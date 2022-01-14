import request from '@/utils/request'

// 查询OtcAdvertise列表
export function listOtcAdvertise(query) {
return request({
url: '/api/v1/otcAdvertiseList',
method: 'get',
params: query
})
}


// 查询OtcAdvertise详细
export function getOtcAdvertise (id) {
return request({
url: '/api/v1/otcAdvertise/' + id,
method: 'get'
})
}

// 新增OtcAdvertise
export function addOtcAdvertise(data) {
return request({
url: '/api/v1/otcAdvertise',
method: 'post',
data: data
})
}


// 修改OtcAdvertise
export function updateOtcAdvertise(data) {
return request({
url: '/api/v1/otcAdvertise',
method: 'put',
data: data
})
}

// 删除OtcAdvertise
export function delOtcAdvertise(id) {
return request({
url: '/api/v1/otcAdvertise/' + id,
method: 'delete'
})
}

