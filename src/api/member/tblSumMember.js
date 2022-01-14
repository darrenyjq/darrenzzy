import request from '@/utils/request'

// 查询TblSumMember列表
export function listTblSumMember(query) {
return request({
url: '/api/v1/tblSumMemberList',
method: 'get',
params: query
})
}

// 查询TblSumMember详细
export function getTblSumMember (id) {
return request({
url: '/api/v1/tblSumMember/' + id,
method: 'get'
})
}


// 新增TblSumMember
export function addTblSumMember(data) {
return request({
url: '/api/v1/tblSumMember',
method: 'post',
data: data
})
}

// 修改TblSumMember
export function updateTblSumMember(data) {
return request({
url: '/api/v1/tblSumMember',
method: 'put',
data: data
})
}

// 删除TblSumMember
export function delTblSumMember(id) {
return request({
url: '/api/v1/tblSumMember/' + id,
method: 'delete'
})
}
