<template>
  <div v-if="!arma">
    <TableComponenet title="Armas" :columns="columns" :content="armas as Arma[]" to="/armas" />
  </div>
  <DescricaoComponent
    v-else
    :title="arma.arma"
    tipo="Item"
    :nivel="0"
    :tracos="arma.tracos"
    :descricao="arma.descricao"
    :sources="arma.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script setup lang="ts">
import { findArma, findReferencia } from '@/data/utils'
import type Arma from '@/interfaces/Arma'
import type Column from '@/interfaces/Column'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import armas from '@/data/armas.json'
import TableComponenet from '@/components/TableComponent.vue'
import DescricaoComponent from '@/components/DescricaoComponent.vue'

const route = useRoute()

const arma: Ref<Arma | undefined> = ref(findArma(Number(route.query.id)))

const columns: Ref<Column[]> = ref([
  {
    title: 'Título',
    key: 'titulo',
  },
  {
    title: 'Preço',
    key: 'preco',
  },
  {
    title: 'Dano',
    key: 'dano',
  },
  {
    title: 'Volume',
    key: 'volume',
  },
  {
    title: 'Mãos',
    key: 'maos',
  },
  {
    title: 'Grupo',
    key: 'grupo',
  },
  {
    title: 'Traços',
    key: 'tracos',
  },
])

watch(
  () => route.query.id,
  (newArma) => {
    const weapon = findArma(Number(newArma))
    if (!weapon) {
      arma.value = undefined
    } else {
      arma.value = weapon
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
