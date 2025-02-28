<template>
  <div v-if="!ancestralidade">
    <div class="card-row">
      <div
        v-for="ancestralidade in collectAncestralidadesByName"
        :key="ancestralidade.ancestralidade"
      >
        <CardComponent
          :link-to="'/ancestralidades?id=' + ancestralidade.href"
          :title="ancestralidade.titulo"
          :descricao="ancestralidade.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ ancestralidade.titulo }}</h1>
      <p><span v-html="ancestralidade.explicacao"></span></p>
    </div>
    <div>
      <h1>Heranças de {{ ancestralidade.titulo }}</h1>
      <div v-for="heranca in herancas?.herancas" :key="heranca.heranca">
        <h3>
          {{ heranca.heranca }}
        </h3>
        <p>{{ heranca.descricao }}</p>
      </div>
    </div>
    <div>
      <h1>Talentos de {{ ancestralidade.titulo }}</h1>
      <div style="margin-right: 3em">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Nível</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="talento in talentos" :key="talento.id">
              <td>
                <RouterLink :to="'talentos?id=' + talento.id">{{ talento.titulo }}</RouterLink>
              </td>
              <td>{{ talento.nivel }}</td>
              <td>{{ talento.descricao }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import {
  collectAncestralidadesByName,
  collectTalentosByAnyTracos,
  findAncestralidade,
  findHerancas,
} from '@/data/utils'
import type { Tracos } from '@/enums/tracos'
import type Ancestralidade from '@/interfaces/Ancestralidade'
import type Heranca from '@/interfaces/Heranca'
import type Talento from '@/interfaces/Talento'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const ancestralidade: Ref<Ancestralidade | undefined> = ref(
  findAncestralidade(route.query.id as string),
)

const herancas: Ref<Heranca | undefined> = ref(findHerancas(route.query.id as string))
const talentos: Ref<Talento[]> = ref(
  collectTalentosByAnyTracos(ancestralidade.value?.idTracos as Tracos[]),
)
watch(
  () => route.query.id,
  (newAncestralidade) => {
    const ancestry = findAncestralidade(newAncestralidade as string)
    if (!ancestry) {
      ancestralidade.value = undefined
      herancas.value = undefined
      talentos.value = []
    } else {
      ancestralidade.value = ancestry
      herancas.value = findHerancas(newAncestralidade as string)
      talentos.value = collectTalentosByAnyTracos(ancestry.idTracos as Tracos[])
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
