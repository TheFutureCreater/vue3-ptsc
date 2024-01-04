export const calculateAge = (birthday) => {
  // 将输入的生日字符串转换为日期对象
  const birthDate = new Date(birthday)

  // 获取当前日期
  const currentDate = new Date()

  // 计算年龄差值
  let age = currentDate.getFullYear() - birthDate.getFullYear()

  // 根据当前日期和生日日期的月份和日期来判断是否已过生日
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age-- // 如果还没过生日，则年龄减一
  }

  return age
}
