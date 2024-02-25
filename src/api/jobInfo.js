// 兼职信息请求接口
import request from '@/utils/request'

// 获取职位列表信息
export const getJobListService = (pageData) => {
  return request({
    url: '/job/list',
    method: 'POST',
    data: pageData
  })
}

// 获取职位详情信息
export const getJobDetailsService = (jobId) => {
  return request({
    url: `/job/${jobId}`
  })
}
