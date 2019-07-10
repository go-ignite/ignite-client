import request from './request'
import builder from './builder'

export const getAccounts = builder.get('/api/admin/accounts') // 获取用户列表

export const getNodes = builder.get('/api/admin/nodes') // 获取节点列表
export const postNodes = builder.post('/api/admin/nodes') // 创建节点
export const deleteNodes = builder.delete('/api/admin/nodes/:id') // 删除节点
export const putNodes = builder.put('/api/admin/nodes/:id') // 修改节点

export const getCodes = builder.get('/api/admin/codes') // 获取邀请码列表
export const postCodes = builder.post('/api/admin/codes_batch') // 创建邀请码
export const deleteCodes = builder.delete('/api/admin/codes/:id') // 删除邀请码
