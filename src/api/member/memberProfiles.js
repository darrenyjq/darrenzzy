import request from '@/utils/request'

// 查询MemberProfiles列表
export function listMemberProfiles(query) {
return request({
url: '/api/v1/memberProfilesList',
method: 'get',
params: query
})
}

// 查询MemberProfiles详细
export function getMemberProfiles (id) {
return request({
url: '/api/v1/memberProfiles/' + id,
method: 'get'
})
}


// 新增MemberProfiles
export function addMemberProfiles(data) {
return request({
url: '/api/v1/memberProfiles',
method: 'post',
data: data
})
}

// 修改MemberProfiles
export function updateMemberProfiles(data) {
return request({
url: '/api/v1/memberProfiles',
method: 'put',
data: data
})
}

// 删除MemberProfiles
export function delMemberProfiles(id) {
return request({
url: '/api/v1/memberProfiles/' + id,
method: 'delete'
})
}
