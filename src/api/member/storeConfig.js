// 查询StoreConfig列表
import request from '@/utils/request'

export function listStoreConfig(query) {
    return request({
    url: '/api/v1/storeConfigList',
    method: 'get',
    params: query
    })
    }
    
    // 查询StoreConfig详细
    export function getStoreConfig (id) {
    return request({
    url: '/api/v1/storeConfig/' + id,
    method: 'get'
    })
    }
    
    
    // 新增StoreConfig
    export function addStoreConfig(data) {
    return request({
    url: '/api/v1/storeConfig',
    method: 'post',
    data: data
    })
    }
    
    // 修改StoreConfig
    export function updateStoreConfig(data) {
    return request({
    url: '/api/v1/storeConfig',
    method: 'put',
    data: data
    })
    }
    
    // 删除StoreConfig
    export function delStoreConfig(id) {
    return request({
    url: '/api/v1/storeConfig/' + id,
    method: 'delete'
    })
    }
    