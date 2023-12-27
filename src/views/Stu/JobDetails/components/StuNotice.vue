<script setup>
const noticeWord =
  '求职过程中如果遇到违规收费、信息不实、以招聘名义的培训收费或者微信营销等虚假招聘行为，请保留证据， 维护自己的合法权益。谨防上当受骗！'
</script>
<template>
  <div class="stu-notice">
    <div class="stu-notice-title">求职安全提醒</div>
    <span class="stu-notice-message">{{ noticeWord }}</span>
  </div>
</template>

<style lang="scss" scoped>
.stu-notice {
  width: 100%;
  min-height: 150px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 24px;

  .stu-notice-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .stu-notice-message {
    line-height: 200%;
    white-space: pre-wrap;
  }
}
</style>
