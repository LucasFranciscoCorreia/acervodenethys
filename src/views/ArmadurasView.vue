<template>
  <div v-if="!armadura">
    <TableComponenet
      title="Armaduras"
      :columns="columns"
      :content="armaduras as Armadura[]"
      to="/armaduras"
    />
  </div>
  <DescricaoComponent
    v-else
    :title="armadura.armadura"
    tipo="Item"
    :nivel="0"
    :tracos="armadura.tracos"
    :descricao="armadura.descricao"
    :sources="armadura.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script setup lang="ts">
import { findArmadura, findReferencia } from '@/data/utils'
import type Column from '@/interfaces/Column'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import armaduras from '@/data/armaduras.json'
import TableComponenet from '@/components/TableComponent.vue'
import type Armadura from '@/interfaces/Armadura'
import DescricaoComponent from '@/components/DescricaoComponent.vue'

const route = useRoute()

const armadura: Ref<Armadura | undefined> = ref(findArmadura(Number(route.query.id)))

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
    title: 'Lim. Destreza',
    key: 'limiteDes',
  },
  {
    title: 'Pen. Teste',
    key: 'penTeste',
  },
  {
    title: 'Pen. Velocidade',
    key: 'penVelocidade',
  },
  {
    title: 'Volume',
    key: 'volume',
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
  (newArmadura) => {
    const armor = findArmadura(Number(newArmadura))
    if (!armor) {
      armadura.value = undefined
    } else {
      armadura.value = armor
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
