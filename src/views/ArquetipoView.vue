<template>
  <div v-if="!arquetipo">
    <div class="card-row">
      <div v-for="arquetipo in collectArquetiposByName" :key="arquetipo.arquetipo">
        <CardComponent
          :link-to="'arquetipos?id=' + arquetipo.href"
          :title="arquetipo.titulo"
          :descricao="arquetipo.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ arquetipo.titulo }}</h1>
      <p><span v-html="arquetipo.explicacao"></span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import { collectArquetiposByName, findArquetipo } from '@/data/utils'
import type Arquetipo from '@/interfaces/Arquetipo'

import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const arquetipo: Ref<Arquetipo | undefined> = ref(findArquetipo(route.query.id as string))

watch(
  () => route.query.id,
  (newArquetipo) => {
    const archetype = findArquetipo(newArquetipo as string)
    if (!archetype) {
      arquetipo.value = undefined
    } else {
      arquetipo.value = archetype
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.card-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em; /* Adjust the gap between cards as needed */
  margin-top: 1em;
}
</style>
