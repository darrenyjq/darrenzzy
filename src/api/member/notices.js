import request from '@/utils/request'

// 查询Notices列表
export function listNotices(query) {
return request({
url: '/api/v1/noticesList',
method: 'get',
params: query
})
}

// 查询Notices详细
export function getNotices (id) {
return request({
url: '/api/v1/notices/' + id,
method: 'get'
})
}

// 查询Notices详细
// export function getNotices (id) {
//     return request({
//     url: '/api/v1/notices/' + id,
//     method: 'get'
//     })
// }


// 新增Notices
export function addNotices(data) {
return request({
url: '/api/v1/notices',
method: 'post',
data: data
})
}

// 修改Notices
export function updateNotices(data) {
return request({
url: '/api/v1/notices',
method: 'put',
data: data
})
}

// 删除Notices
export function delNotices(id) {
return request({
url: '/api/v1/notices/' + id,
method: 'delete'
})
}
