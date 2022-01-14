import request from '@/utils/request'

// 查询MemberDeposit列表
export function listMemberDeposit(query) {
return request({
url: '/api/v1/memberDepositList',
method: 'get',
params: query
})
}

// 查询MemberDeposit详细
export function getMemberDeposit (id) {
return request({
url: '/api/v1/memberDeposit/' + id,
method: 'get'
})
}


// 新增MemberDeposit
export function addMemberDeposit(data) {
return request({
url: '/api/v1/memberDeposit',
method: 'post',
data: data
})
}

// 修改MemberDeposit
export function updateMemberDeposit(data) {
return request({
url: '/api/v1/memberDeposit',
method: 'put',
data: data
})
}

// 删除MemberDeposit
export function delMemberDeposit(id) {
return request({
url: '/api/v1/memberDeposit/' + id,
method: 'delete'
})
}
