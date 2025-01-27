<template>
  <div class="card fixed-height" style="width: 15rem">
    <RouterLink :to="linkTo">
      <img v-if="imgSrc" :src="imgSrc" class="card-img-top" :alt="alt" />
    </RouterLink>
    <div class="card-body">
      <h5 v-if="imgSrc" class="card-title">{{ title }}</h5>
      <RouterLink v-else :to="linkTo">
        <h5 class="card-title">{{ title }}</h5>
      </RouterLink>
      <p class="card-text">
        {{ descricao }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  linkTo: string
  title: string
  descricao: string
  imgSrc?: string
  alt?: string
}>()
</script>

<style scoped>
.fixed-height {
  max-height: 12rem; /* Adjust this value as needed */
  overflow: hidden;
}
</style>
