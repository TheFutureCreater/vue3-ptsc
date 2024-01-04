// 学生简历请求接口
import request from '@/utils/request'

// 获取学生简历信息
export const getStuResumeService = (resumeId) => {
  return request({
    url: '/stu/resume',
    params: {
      resumeId
    }
  })
}
