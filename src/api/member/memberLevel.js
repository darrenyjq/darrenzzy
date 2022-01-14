import request from '@/utils/request'

// 查询MemberLevel列表
export function listMemberLevel(query) {
return request({
url: '/api/v1/memberLevelList',
method: 'get',
params: query
})
}

// 查询MemberLevel详细
export function getMemberLevel (memberId) {
return request({
url: '/api/v1/memberLevel/' + memberId,
method: 'get'
})
}


// 新增MemberLevel
export function addMemberLevel(data) {
return request({
url: '/api/v1/memberLevel',
method: 'post',
data: data
})
}

// 修改MemberLevel
export function updateMemberLevel(data) {
return request({
url: '/api/v1/memberLevel',
method: 'put',
data: data
})
}

// 删除MemberLevel
export function delMemberLevel(id) {
return request({
url: '/api/v1/memberLevel/' + id,
method: 'delete'
})
}
