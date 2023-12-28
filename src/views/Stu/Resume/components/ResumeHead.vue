<script setup></script>

<template>
  <div class="resume-head">
    <span class="head-title">我的简历</span>
    <span class="head-function">
      <span>预览</span>
      <el-divider direction="vertical" />
      <span>导入简历</span>
      <el-divider direction="vertical" />
      <span>导出简历</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.resume-head {
  height: 50px;
  border-radius: 10px 10px 0 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid;

  .head-title {
    font-weight: bold;
    font-size: 16px;
  }

  .head-function {
    height: 100%;
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
      display: block;
      height: 100%;
      line-height: 50px;
      padding: 0 10px;
    }
  }
}
</style>
