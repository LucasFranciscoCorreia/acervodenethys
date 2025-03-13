<template>
  <div v-if="!talento">
    <TableComponent title="Talentos" :columns="columns" :content="talentos as Talento[]" to="/talentos" />
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
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import { collectTalentosByName, collectTalentosGerais, collectTalentosPericia, findTalento } from '@/data/utils'
import type Column from '@/interfaces/Column'
import type Talento from '@/interfaces/Talento'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const collectTalentosByCategoria = (categoria: string): Talento[] => {
  switch(categoria){
      case 'gerais':
        return collectTalentosGerais.value
        break;
      case 'pericia':
        return collectTalentosPericia.value
        break;
      default:
        return collectTalentosByName.value
    }
}


const talentos = ref(collectTalentosByCategoria(route.query.categoria as string))

const talento: Ref<Talento | undefined> = ref(findTalento(route.query.id as unknown as number))

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
    const feat = findTalento(newTalento as unknown as number)
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
    talentos.value = collectTalentosByCategoria(newCategoria as string)
  },
)
</script>
