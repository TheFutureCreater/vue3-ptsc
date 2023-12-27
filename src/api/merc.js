// 公司信息请求接口
import request from '@/utils/request'

// 获取公司列表信息
// export const getJobListService = (pageData) => {
//   return request({
//     url: '/job/list',
//     params: {
//       pageNum: pageData.pageNum,
//       pageSize: pageData.pageSize,
//       mercId: pageData.mercId,
//       searchWord: pageData.searchWord,
//       cityId: pageData.cityId,
//       jobForm: pageData.jobForm
//     }
//   })
// }

// 获取公司详情信息
export const getMercProfileService = (mercId) => {
  return request({
    url: '/merc/profile',
    params: {
      mercId
    }
  })
}
