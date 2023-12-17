<script setup>
import SearchBox from './SearchBox.vue'
import SearchRecommed from './SearchRecommed.vue'
// const searchType = ref(0)
</script>

<template>
  <div class="home-search">
    <div class="container">
      <SearchBox />
      <SearchRecommed />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-search {
  height: 140px;
  background-color: #fff;

  .container {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
