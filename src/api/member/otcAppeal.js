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
export function getOtcAppeal (id) {
return request({
url: '/api/v1/otcAppeal/' + id,
method: 'get'
})
}


// 新增OtcAppeal
export function addOtcAppeal(data) {
return request({
url: '/api/v1/otcAppeal',
method: 'post',
data: data
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

// 删除OtcAppeal
export function delOtcAppeal(id) {
return request({
url: '/api/v1/otcAppeal/' + id,
method: 'delete'
})
}
