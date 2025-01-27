<template>
  <div v-if="!talento">
    <div class="card-row">
      <div v-for="talento in collectTalentosByName" :key="talento.id">
        <CardComponent
          :link-to="'/talentos?id=' + talento.id"
          :title="talento.titulo"
          :descricao="talento.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <DescricaoComponent
      :title="talento.titulo"
      tipo="Talento"
      :nivel="talento.nivel"
      :tracos="talento.tracos"
      :descricao="talento.descricao"
    />
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import { collectTalentosByName, findTalento } from '@/data/utils'
import type Talento from '@/interfaces/Talento'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const talento: Ref<Talento | undefined> = ref(findTalento(route.query.id as unknown as number))

watch(
  () => route.query.id,
  (newTalento) => {
    const feat = findTalento(newTalento as unknown as number)
    if (!feat) {
      talento.value = undefined
    } else {
      talento.value = feat
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-right: 1em;
}

th,
td {
  padding: 0.5em; /* Add padding to create margin effect */
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
