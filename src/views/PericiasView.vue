<template>
  <div v-if="!pericia">
    <div class="card-row">
      <div v-for="pericia in collectPericiasByName" :key="pericia.pericia">
        <CardComponent
          :link-to="'pericias?id=' + pericia.href"
          :title="pericia.pericia"
          :descricao="pericia.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ pericia.pericia }}</h1>
      <p><span v-html="pericia.explicacao"></span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import { collectPericiasByName, findPericia } from '@/data/utils'
import type Pericia from '@/interfaces/Pericia'

import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pericia: Ref<Pericia | undefined> = ref(findPericia(route.query.id as string))

watch(
  () => route.query.id,
  (newPericia) => {
    const skill = findPericia(newPericia as string)
    if (!skill) {
      pericia.value = undefined
    } else {
      pericia.value = skill
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
