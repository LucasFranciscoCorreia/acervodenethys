<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div class="main-content">
    <SidebarComponent />
    <div class="content-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  height: 100%;
  width: 100%;
}

.content-wrapper{
  width:100%
}
</style>
