<template>
  <div v-if="!magia">
    <TableComponent title="Magias" :columns="columns" :content="magias as Magia[]" to="/magias" />
  </div>
  <DescricaoComponent v-else
    :title="magia.magia"
    tipo="Magia"
    :nivel="magia.ranque"
    :tracos="magia.tracos"
    :descricao="magia.descricao"
    :sources="magia.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script setup lang="ts">
import DescricaoComponent from '@/components/DescricaoComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import { collectMagiasArcanas, collectMagiasByName, collectMagiasDivinas, collectMagiasFoco, collectMagiasOcultistas, collectMagiasPrimais, collectMagiasRitual, findMagia, findReferencia } from '@/data/utils';
import type Column from '@/interfaces/Column';
import type Magia from '@/interfaces/Magia';
import { ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const collectMagiasByCategoria = (categoria: string): Magia[] => {
  switch(categoria){
      case 'arcana':
        return collectMagiasArcanas.value
      case 'divina':
        return collectMagiasDivinas.value
      case 'primal':
        return collectMagiasPrimais.value
      case 'ocultista':
        return collectMagiasOcultistas.value
      case 'foco':
        return collectMagiasFoco.value
      case 'ritual':
        return collectMagiasRitual.value
      default:
        return collectMagiasByName.value
    }
}

const magias = ref(collectMagiasByCategoria(String(route.query.tipo)))

console.log((magias.value))

const magia: Ref<Magia | undefined> = ref(findMagia(Number(route.query.id)))

console.log(magia.value)
  const columns: Ref<Column[]> = ref([
  {
    title: 'Magia',
    key: 'magia',
  },
  {
    title: 'Ranque',
    key: 'ranque',
  },
  {
    title: 'Tracos',
    key: 'tracos',
  },
])

watch(
  () => route.query.tipo,
  (newCategoria) => {
    magias.value = collectMagiasByCategoria(String(newCategoria))
  },
)

watch(
  () => route.query.id,
  (newMagia) => {
    const spell = findMagia(Number(newMagia))
    console.log(spell)
    if (!spell) {
      magia.value = undefined
    } else {
       magia.value = spell
    }
  },
  { immediate: true },
)

</script>
