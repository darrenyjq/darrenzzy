import request from '@/utils/request'

// 查询Coin列表
export function listCoin(query) {
  return request({
    url: '/api/v1/coinList',
    method: 'get',
    params: query
  })
}

//查询coinName
export function listCoinName() {
  return request({
    url: '/api/v1/coinNameList',
    method: 'get'
  })
}

// 查询Coin详细
export function getCoin(id) {
  return request({
    url: '/api/v1/coin/' + id,
    method: 'get'
  })
}

// 新增Coin
export function addCoin(data) {
  return request({
    url: '/api/v1/coin',
    method: 'post',
    data: data
  })
}

// 修改Coin
export function updateCoin(data) {
  return request({
    url: '/api/v1/coin',
    method: 'put',
    data: data
  })
}

// 删除Coin
export function delCoin(id) {
  console.log('id = ', id)
  return request({
    url: '/api/v1/coin/' + id,
    method: 'delete'
  })
}
