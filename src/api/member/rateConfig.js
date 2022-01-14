// 查询RateConfig列表
import request from '@/utils/request'

export function listRateConfig(query) {
    return request({
    url: '/api/v1/rateConfigList',
    method: 'get',
    params: query
    })
    }
    
    // 查询RateConfig详细
    export function getRateConfig (id) {
    return request({
    url: '/api/v1/rateConfig/' + id,
    method: 'get'
    })
    }
    
    
    // 新增RateConfig
    export function addRateConfig(data) {
    return request({
    url: '/api/v1/rateConfig',
    method: 'post',
    data: data
    })
    }
    
    // 修改RateConfig
    export function updateRateConfig(data) {
    return request({
    url: '/api/v1/rateConfig',
    method: 'put',
    data: data
    })
    }
    
    // 删除RateConfig
    export function delRateConfig(id) {
    return request({
    url: '/api/v1/rateConfig/' + id,
    method: 'delete'
    })
    }
    