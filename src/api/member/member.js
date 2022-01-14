import request from '@/utils/request'

// 查询Member列表
export function listMember(query) {
  return request({
    url: '/api/v1/memberList',
    method: 'get',
    params: query
  })
}

// 查询Member列表
export function listMemberLevel(query) {
  return request({
    url: '/api/v1/memberLevelList',
    method: 'get',
    params: query
  })
}
// 查询Member详细
export function getMember(id) {
  return request({
    url: '/api/v1/member/' + id,
    method: 'get'
  })
}

// 新增Member
export function addMember(data) {
  return request({
    url: '/api/v1/member',
    method: 'post',
    data: data
  })
}

// 修改Member
export function updateMember(data) {
  return request({
    url: '/api/v1/member',
    method: 'put',
    data: data
  })
}

// 修改Member谷歌验证
export function updateMemberStatus(Id, GoogleAuthSwitch) {
  const data = {
    Id,
    GoogleAuthSwitch
  }
  return request({
    url: '/api/v1/member',
    method: 'put',
    data: data
  })
}

// 删除Member
export function delMember(id) {
  return request({
    url: '/api/v1/member/' + id,
    method: 'delete'
  })
}
