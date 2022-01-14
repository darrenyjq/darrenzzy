import request from '@/utils/request'

// 查询MemberTransaction列表
export function listMemberTransaction(query) {
return request({
url: '/api/v1/memberTransactionList',
method: 'get',
params: query
})
}


// 查询MemberTransaction详细
export function getMemberTransaction (id) {
return request({
url: '/api/v1/memberTransaction/' + id,
method: 'get'
})
}

// 查询今日待处理业务
export function getmemberCount () {
    return request({
    url: '/api/v1/memberCount',
    method: 'get'
    })
}


// 新增MemberTransaction
export function addMemberTransaction(data) {
return request({
url: '/api/v1/memberTransaction',
method: 'post',
data: data
})
}

// 修改MemberTransaction
export function updateMemberTransaction(data) {
return request({
url: '/api/v1/memberTransaction',
method: 'put',
data: data
})
}

// 删除MemberTransaction
export function delMemberTransaction(id) {
return request({
url: '/api/v1/memberTransaction/' + id,
method: 'delete'
})
}