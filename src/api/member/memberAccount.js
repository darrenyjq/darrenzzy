import request from '@/utils/request'

// 查询MemberAccount列表
export function listMemberAccount(query) {
return request({
url: '/api/v1/memberAccountList',
method: 'get',
params: query
})
}

// 查询MemberAccount详细
export function getMemberAccount (id) {
return request({
url: '/api/v1/memberAccount/' + id,
method: 'get'
})
}


// 新增MemberAccount
export function addMemberAccount(data) {
return request({
url: '/api/v1/memberAccount',
method: 'post',
data: data
})
}

// 修改MemberAccount
export function updateMemberAccount(data) {
return request({
url: '/api/v1/memberAccount',
method: 'put',
data: data
})
}

// 删除MemberAccount
export function delMemberAccount(id) {
return request({
url: '/api/v1/memberAccount/' + id,
method: 'delete'
})
}