import request from '@/utils/request'

// 查询TblSumAmount列表
export function listTblSumAmount(query) {
return request({
url: '/api/v1/tblSumAmountList',
method: 'get',
params: query
})
}

// 查询TblSumAmount详细
export function getTblSumAmount (id) {
return request({
url: '/api/v1/tblSumAmount/' + id,
method: 'get'
})
}


// 新增TblSumAmount
export function addTblSumAmount(data) {
return request({
url: '/api/v1/tblSumAmount',
method: 'post',
data: data
})
}

// 修改TblSumAmount
export function updateTblSumAmount(data) {
return request({
url: '/api/v1/tblSumAmount',
method: 'put',
data: data
})
}

// 删除TblSumAmount
export function delTblSumAmount(id) {
return request({
url: '/api/v1/tblSumAmount/' + id,
method: 'delete'
})
}