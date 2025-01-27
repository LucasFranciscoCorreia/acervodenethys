<template>
  <div v-if="!classe">
    <div class="card-row">
      <div v-for="classe in collectClassesByName" :key="classe.classe">
        <CardComponent
          :link-to="'classes?id=' + classe.href"
          :title="classe.titulo"
          :descricao="classe.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ classe.titulo }}</h1>
      <p><span v-html="classe.explicacao"></span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import { collectClassesByName, findClasse } from '@/data/utils'
import type Classe from '@/interfaces/Classe'

import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const classe: Ref<Classe | undefined> = ref(findClasse(route.query.id as string))

watch(
  () => route.query.id,
  (newClasse) => {
    const job = findClasse(newClasse as string)
    if (!job) {
      classe.value = undefined
    } else {
      classe.value = job
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
