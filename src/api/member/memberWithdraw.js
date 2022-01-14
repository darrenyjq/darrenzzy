import request from '@/utils/request'

// 查询MemberWithdraw列表
export function listMemberWithdraw(query) {
return request({
url: '/api/v1/memberWithdrawList',
method: 'get',
params: query
})
}

// 查询MemberWithdraw详细
export function getMemberWithdraw (id) {
return request({
url: '/api/v1/memberWithdraw/' + id,
method: 'get'
})
}


// 新增MemberWithdraw
export function addMemberWithdraw(data) {
return request({
url: '/api/v1/memberWithdraw',
method: 'post',
data: data
})
}

// 修改MemberWithdraw
export function updateMemberWithdraw(data) {
return request({
url: '/api/v1/memberWithdraw',
method: 'put',
data: data
})
}

// 删除MemberWithdraw
export function delMemberWithdraw(id) {
return request({
url: '/api/v1/memberWithdraw/' + id,
method: 'delete'
})
}
