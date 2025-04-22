<template>
  <div v-if="!talento">
    <TableComponent title="Talentos" :columns="columns" :content="talentos as Talento[]" to="/talentos" />
  </div>
  <DescricaoComponent v-else
    :title="talento.titulo"
    tipo="Talento"
    :nivel="talento.nivel"
    :tracos="talento.tracos"
    :descricao="talento.descricao"
    :sources="talento.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script lang="ts" setup>
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import { collectTalentosGerais, collectTalentosGeraisOnly, collectTalentosPericia, findReferencia, findTalento } from '@/data/utils'
import type Column from '@/interfaces/Column'
import type Talento from '@/interfaces/Talento'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const collectTalentosByCategoria = (categoria: string): Talento[] => {
  switch(categoria){
      case 'gerais':
        return collectTalentosGeraisOnly.value
        break;
      case 'pericia':
        return collectTalentosPericia.value
        break;
      default:
        return collectTalentosGerais.value
    }
}


const talentos = ref(collectTalentosByCategoria(String(route.query.categoria)))

const talento: Ref<Talento | undefined> = ref(findTalento(Number(route.query.id)))

const columns: Ref<Column[]> = ref([
  {
    title: 'Título',
    key: 'titulo',
  },
  {
    title: 'Nível',
    key: 'nivel',
  },
  {
    title: 'Tracos',
    key: 'tracos',
  },
])

watch(
  () => route.query.id,
  (newTalento) => {
    const feat = findTalento(Number(newTalento))
    if (!feat) {
      talento.value = undefined
    } else {
      talento.value = feat
    }
  },
  { immediate: true },
)

watch(
  () => route.query.categoria,
  (newCategoria) => {
    talentos.value = collectTalentosByCategoria(String(newCategoria as string))
  },
)
</script>
