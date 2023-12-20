// 兼职信息请求接口
import request from '@/utils/request'

// 获取职位列表信息
export const getJobListService = (params) => {
  return request({
    url: '/job/list',
    params
  })
}
