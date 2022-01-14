import request from '@/utils/request'

// 查询OtcCoin列表
export function listOtcCoin(query) {
  return request({
    url: '/api/v1/otcCoinList',
    method: 'get',
    params: query
  })
}

// 查询OtcCoin详细
export function getOtcCoin(id) {
  return request({
    url: '/api/v1/otcCoin/' + id,
    method: 'get'
  })
}

// 查询
export function getRate() {
  return request({
    url: '/api/v1/exchangeRate',
    method: 'get'
  })
}

// 新增OtcCoin
export function addOtcCoin(data) {
  return request({
    url: '/api/v1/otcCoin',
    method: 'post',
    data: data
  })
}

// 修改OtcCoin
export function updateOtcCoin(data) {
  return request({
    url: '/api/v1/otcCoin',
    method: 'put',
    data: data
  })
}

// 删除OtcCoin
export function delOtcCoin(id) {
  return request({
    url: '/api/v1/otcCoin/' + id,
    method: 'delete'
  })
}
