<template>
  <div v-if="!ancestralidade">
    <div class="card-row">
      <div
        v-for="ancestralidade in ancestralidades"
        :key="ancestralidade.ancestralidade"
      >
        <CardComponent
          :link-to="'/ancestralidades?id=' + ancestralidade.id"
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
      <TableComponenet
        title="Talentos"
        :columns="columns"
        :content="talentosFilter as Talento[]"
        to="/talentos"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  findHerancas,
} from '@/data/utils'

import CardComponent from '@/components/CardComponent.vue'
import TableComponenet from '@/components/TableComponent.vue'
import HttpRequest from '@/http.request'

import type Ancestralidade from '@/interfaces/Ancestralidade'
import type Heranca from '@/interfaces/Heranca'
import type Referencia from '@/interfaces/Referencia'
import type Talento from '@/interfaces/Talento'

const route = useRoute()

const isLoading: Ref<boolean> = ref(true)

const ancestralidades: Ref<Ancestralidade[]> = ref([])
const referencias: Ref<Referencia[]> = ref([])
const talentos: Ref<Talento[]> = ref([])

onMounted(async () => {
  isLoading.value = true

  const ref = HttpRequest.instance.getReferencias().then(res => {
    referencias.value = res.sort((a, b) => a.titulo.localeCompare(b.titulo));
  });

  const tal = HttpRequest.instance.getTalentos().then(res => {
    talentos.value = res.sort((a, b) => a.nivel - b.nivel);
  });

  const anc = HttpRequest.instance.getAncestralidades().then(res => {
    ancestralidades.value = res.sort((a, b) => a.ancestralidade.localeCompare(b.ancestralidade));
  });

  Promise.all([ref, tal, anc]).then(() => {

    isLoading.value = false
  });
});

const talentosFilter: ComputedRef<Talento[]> = computed(() => {
  if (ancestralidade.value === undefined) return []
  const id = Number(ancestralidade.value.id);
  return talentos.value.filter((a) => a.tracos.includes(id));
});

const ancestralidade: ComputedRef<Ancestralidade | undefined> = computed(() => {
  if (route.query.id === undefined) return undefined
  const id = Number(route.query.id)
  return ancestralidades.value.find((a) => a.id === id)
});

const herancas: ComputedRef<Heranca | undefined> = computed(() => {
  if (ancestralidade.value === undefined) return undefined
  const id = Number(ancestralidade.value.id);
  return findHerancas(id)
});

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
