import request from '@/utils/request'

// 查询DealList列表
export function listDealList(query) {
return request({
url: '/api/v1/dealListList',
method: 'get',
params: query
})
}

// 查询DealList详细
export function getDealList (id) {
return request({
url: '/api/v1/dealList/' + id,
method: 'get'
})
}


// 新增DealList
export function addDealList(data) {
return request({
url: '/api/v1/dealList',
method: 'post',
data: data
})
}

// 修改DealList
export function updateDealList(data) {
return request({
url: '/api/v1/dealList',
method: 'put',
data: data
})
}

// 删除DealList
export function delDealList(id) {
return request({
url: '/api/v1/dealList/' + id,
method: 'delete'
})
}
