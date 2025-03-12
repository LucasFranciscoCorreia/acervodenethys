<template>
  <div v-if="!arma">
    <TableComponenet title="Armaduras" :columns="columns" :content="armaduras as Armadura[]" to="/armaduras" />
  </div>
  <div v-else>A</div>
</template>

<script setup lang="ts">
import {findArmadura } from '@/data/utils'
import type Column from '@/interfaces/Column'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import armaduras from '@/data/armaduras.json'
import TableComponenet from '@/components/TableComponenet.vue'
import type Armadura from '@/interfaces/Armadura'

const route = useRoute()

const arma: Ref<Armadura | undefined> = ref(findArmadura(Number(route.query.id)))

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
]);

watch(
  () => route.query.id,
  (newArmadura) => {
    const armor = findArmadura(Number(newArmadura))
    if (!armor) {
      arma.value = undefined
    } else {
      arma.value = armor
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
