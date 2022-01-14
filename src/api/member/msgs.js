import request from '@/utils/request'

// 查询Msgs列表
export function listMsgs(query) {
return request({
url: '/api/v1/msgsList',
method: 'get',
params: query
})
}

// 查询Msgs列表
export function listMsgsFromId(query) {
    return request({
    url: '/api/v1/msgsFromIdList',
    method: 'get',
    params: query
    })
}


// 调用服务端接口
export function omChat(query) {
    return request({
    url: '/api/v1/omChat',
    method: 'get',
    params: query
    })
}

//发送图片
export function putOmChatImg(data) {
    return request({
    url: '/api/v1/omChat',
    method: 'post',
    data: data
    })
}



// // 用户头像上传
// export function uploadAvatar(data) {
//     return request({
//       url: '/api/v1/user/avatar',
//       method: 'post',
//       data: data
//     })
//   }

// 根据orderno 查询数据
export function getMsgsOrderNo (orderNo) {
    return request({
    url: '/api/v1/msgsOrderNo/' + orderNo,
    method: 'get'
    })
}


// 查询Msgs详细
export function getMsgs (id) {
return request({
url: '/api/v1/msgs/' + id,
method: 'get'
})
}


// 新增Msgs
export function addMsgs(data) {
return request({
url: '/api/v1/msgs',
method: 'post',
data: data
})
}

// 修改Msgs
export function updateMsgs(data) {
return request({
url: '/api/v1/msgs',
method: 'put',
data: data
})
}

// 删除Msgs
export function delMsgs(id) {
return request({
url: '/api/v1/msgs/' + id,
method: 'delete'
})
}
