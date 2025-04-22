<template>
  <div v-if="!escudo">
    <TableComponenet
      title="Escudos"
      :columns="columns"
      :content="escudos as Escudo[]"
      to="/escudos"
    />
  </div>
  <DescricaoComponent
    v-else
    :title="escudo.escudo"
    tipo="Item"
    :nivel="0"
    :tracos="escudo.tracos"
    :descricao="escudo.descricao"
    :sources="escudo.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script setup lang="ts">
import { findEscudo, findReferencia } from '@/data/utils'
import type Column from '@/interfaces/Column'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import escudos from '@/data/escudos.json'
import TableComponenet from '@/components/TableComponent.vue'
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import type Escudo from '@/interfaces/Escudo'

const route = useRoute()

const escudo: Ref<Escudo | undefined> = ref(findEscudo(Number(route.query.id)))

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
    title: 'Bônus de CA',
    key: 'bonusCA',
  },
  {
    title: 'Pen. Velocidade',
    key: 'penVelocidade',
  },
  {
    title: 'PV',
    key: 'PV',
  },
  {
    title: 'Dureza',
    key: 'dureza',
  },
  {
    title: 'Volume',
    key: 'volume',
  },
])

watch(
  () => route.query.id,
  (newEscudo) => {
    const shield = findEscudo(Number(newEscudo))
    if (!shield) {
      escudo.value = undefined
    } else {
      escudo.value = shield
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
