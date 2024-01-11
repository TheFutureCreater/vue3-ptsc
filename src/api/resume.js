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

// 修改学生简历信息
export const setStuResumeService = (resumeInfo) => {
  return request({
    url: '/stu/resume',
    method: 'PUT',
    data: resumeInfo
  })
}

//修改个人优势
export const setRsumeNoteService = (note) => {
  return request({
    url: '/stu/resume',
    method: 'PUT',
    data: note
  })
}

// 修改期望职位
export const setResumeDesireService = (desire) => {
  return request({
    url: '/resume/desire',
    method: 'PUT',
    data: desire
  })
}

// 添加期望职位
export const addResumeDesireService = (desire) => {
  return request({
    url: '/resume/desire',
    method: 'POST',
    data: desire
  })
}
