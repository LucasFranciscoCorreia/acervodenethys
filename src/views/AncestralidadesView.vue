<template>
  <div v-if="!ancestralidade">
    <div class="card-row">
      <div
        v-for="ancestralidade in collectAncestralidadesByName"
        :key="ancestralidade.ancestralidade"
      >
        <CardComponent
          :link-to="'/ancestralidades?id=' + ancestralidade.href"
          :title="ancestralidade.ancestralidade"
          :descricao="ancestralidade.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ ancestralidade.ancestralidade }}</h1>
      <p><span v-html="ancestralidade.explicacao"></span></p>
    </div>
    <div>
      <h1>Heranças de {{ ancestralidade.ancestralidade }}</h1>
      <div v-for="heranca in herancas?.herancas" :key="heranca.heranca">
        <h3>
          {{ heranca.heranca }}
        </h3>
        <p>{{ heranca.descricao }}</p>
      </div>
    </div>
    <div>
      <TableComponenet title="Talentos" :columns="columns" :content="talentos" to="/talentos" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import TableComponenet from '@/components/TableComponenet.vue'
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

const columns = ref([
  { title: 'Título', key: 'titulo' },
  { title: 'Nível', key: 'nivel' },
  { title: 'Descrição', key: 'descricao' },
])
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
