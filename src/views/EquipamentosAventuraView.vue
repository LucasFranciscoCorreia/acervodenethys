<template>
  <div v-if="!equipamento">
    <TableComponenet
      title="Equipamentos de Aventura"
      :columns="columns"
      :content="equipamentos as EquipamentoAventura[]"
      to="/equipamentos"
    />
  </div>
  <DescricaoComponent
    v-else
    :title="equipamento.nome"
    tipo="Item"
    :nivel="0"
    :tracos="[]"
    :descricao="equipamento.descricao"
    :sources="
      equipamento.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)
    "
  />
</template>

<script setup lang="ts">
import type Column from '@/interfaces/Column'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import TableComponenet from '@/components/TableComponent.vue'
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import equipamentos from '@/data/equipamentosAventura.json'
import type EquipamentoAventura from '@/interfaces/EquipamentoAventura'
import { findEquipamentoAventura, findReferencia } from '@/data/utils'

const route = useRoute()

const equipamento: Ref<EquipamentoAventura | undefined> = ref(
  findEquipamentoAventura(Number(route.query.id)),
)

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
    title: 'Nível',
    key: 'nivel',
  },
  {
    title: 'Maos',
    key: 'maos',
  },
  {
    title: 'Volume',
    key: 'volume',
  },
])

watch(
  () => route.query.id,
  (newEquipamento) => {
    const equipment = findEquipamentoAventura(Number(newEquipamento))
    if (!equipment) {
      equipamento.value = undefined
    } else {
      equipamento.value = equipment
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
