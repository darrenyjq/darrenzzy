import request from '@/utils/request'

// 查询DepositAddress列表
export function listDepositAddress(query) {
return request({
url: '/api/v1/depositAddressList',
method: 'get',
params: query
})
}

// 查询DepositAddress详细
export function getDepositAddress (id) {
return request({
url: '/api/v1/depositAddress/' + id,
method: 'get'
})
}


// 新增DepositAddress
export function addDepositAddress(data) {
return request({
url: '/api/v1/depositAddress',
method: 'post',
data: data
})
}

// 修改DepositAddress
export function updateDepositAddress(data) {
return request({
url: '/api/v1/depositAddress',
method: 'put',
data: data
})
}

// 删除DepositAddress
export function delDepositAddress(id) {
return request({
url: '/api/v1/depositAddress/' + id,
method: 'delete'
})
}