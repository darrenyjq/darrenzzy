import request from '@/utils/request'

// 查询AppConfig列表
export function listAppConfig(query) {
return request({
url: '/api/v1/appConfigList',
method: 'get',
params: query
})
}

// 查询AppConfig详细
export function getAppConfig (id) {
return request({
url: '/api/v1/appConfig/' + id,
method: 'get'
})
}


// 新增AppConfig
export function addAppConfig(data) {
return request({
url: '/api/v1/appConfig',
method: 'post',
data: data
})
}

// 修改AppConfig
export function updateAppConfig(data) {
return request({
url: '/api/v1/appConfig',
method: 'put',
data: data
})
}

// 删除AppConfig
export function delAppConfig(id) {
return request({
url: '/api/v1/appConfig/' + id,
method: 'delete'
})
}
