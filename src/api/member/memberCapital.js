import request from '@/utils/request'

// 查询MemberCapital列表
export function listMemberCapital(query) {
return request({
url: '/api/v1/memberCapitalList',
method: 'get',
params: query
})
}

// 查询MemberCapital详细
export function getMemberCapital (id) {
return request({
url: '/api/v1/memberCapital/' + id,
method: 'get'
})
}


// 新增MemberCapital
export function addMemberCapital(data) {
return request({
url: '/api/v1/memberCapital',
method: 'post',
data: data
})
}

// 修改MemberCapital
export function updateMemberCapital(data) {
return request({
url: '/api/v1/memberCapital',
method: 'put',
data: data
})
}

// 删除MemberCapital
export function delMemberCapital(id) {
return request({
url: '/api/v1/memberCapital/' + id,
method: 'delete'
})
}