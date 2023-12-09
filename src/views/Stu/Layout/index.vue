<script setup>
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutSidebar from './components/LayoutSidebar.vue'
</script>

<template>
  <LayoutFixed />
  <LayoutSidebar />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
