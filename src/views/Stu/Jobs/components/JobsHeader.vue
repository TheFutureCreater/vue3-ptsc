<script setup>
import SearchBox from '../../Home/components/SearchBox.vue'
import SearchRecommed from '../../Home/components/SearchRecommed.vue'
import JobForm from './JobForm.vue'
</script>

<template>
  <div class="jobs-header">
    <div class="container">
      <h1 class="page-title">职位推荐</h1>
      <div class="search-box">
        <SearchBox />
        <SearchRecommed />
      </div>
      <div class="job-search-form">
        <JobForm />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jobs-header {
  // height: 400px;
  background-color: #fff;

  .container {
    align-items: start;
    flex-direction: column;

    .page-title {
      margin-top: 20px;
    }

    .search-box {
      margin-top: 20px;
    }

    .job-search-form {
      margin: 20px 0;
    }
  }
}
</style>
