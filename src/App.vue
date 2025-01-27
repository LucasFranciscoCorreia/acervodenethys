<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div class="main-content">
    <SidebarComponent />
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
}
</style>
