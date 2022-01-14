import request from '@/utils/request'

// 查询CoinProvider列表
export function listCoinProvider(query) {
return request({
url: '/api/v1/coinProviderList',
method: 'get',
params: query
})
}

// 查询CoinProvider详细
export function getCoinProvider (id) {
return request({
url: '/api/v1/coinProvider/' + id,
method: 'get'
})
}


// 新增CoinProvider
export function addCoinProvider(data) {
return request({
url: '/api/v1/coinProvider',
method: 'post',
data: data
})
}

// 修改CoinProvider
export function updateCoinProvider(data) {
return request({
url: '/api/v1/coinProvider',
method: 'put',
data: data
})
}

// 删除CoinProvider
export function delCoinProvider(id) {
return request({
url: '/api/v1/coinProvider/' + id,
method: 'delete'
})
}
