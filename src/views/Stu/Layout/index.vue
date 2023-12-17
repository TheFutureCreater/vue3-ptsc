<script setup>
// import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutSidebar from './components/LayoutSidebar.vue'
</script>

<template>
  <LayoutFixed />
  <LayoutSidebar />
  <div style="width: 100%; height: 60px" />
  <RouterView />
  <LayoutFooter />
</template>
