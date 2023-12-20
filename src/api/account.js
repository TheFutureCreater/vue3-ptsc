// 用户登录注册接口
import request from '@/utils/request'

// 用户手机号码注册
export const userRegByPhoneService = ({ userType, phoneNum, authCode, password }) => {
  return request({
    url: `/user/reg/phone`,
    method: 'POST',
    data: {
      userType,
      phoneNum,
      authCode,
      password
    }
  })
}

//用户手机号密码登录
export const userLogByPhonePasswordService = ({ userType, phoneNum, password }) => {
  return request({
    url: `/user/log/phone/password`,
    method: 'POST',
    data: {
      userType,
      phoneNum,
      password
    }
  })
}
