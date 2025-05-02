<template>
  <div v-if="!talento">
    <TableComponent
      title="Talentos"
      :columns="columns"
      :content="talentos as Talento[]"
      to="/talentos"
    />
  </div>
  <DescricaoComponent
    v-else
    :title="talento.titulo"
    tipo="Talento"
    :nivel="talento.nivel"
    :tracos="talento.tracos"
    :descricao="talento.descricao"
    :sources="talento.referencia.map((el: Referencia) => findReferencia(el.id)).filter((el: Referencia) => el !== undefined)"
  />
</template>

<script lang="ts" setup>
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import HttpRequest from '@/http.request'
import type Column from '@/interfaces/Column'
import type Talento from '@/interfaces/Talento'
import type Referencia from '@/interfaces/Referencia'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { Tracos } from '@/enums/tracos'

const route = useRoute()
const referencias: Ref<Referencia[]> = ref([])
const isLoading = ref(true)

onMounted(() => {
  isLoading.value = true
  const ref = HttpRequest.instance.getReferencias().then(res => {
    referencias.value = res
    isLoading.value = false
  });

  const tal = HttpRequest.instance.getTalentos().then(res => {
    talentos.value = res
    isLoading.value = false
  });

  Promise.all([ref, tal]).then(() => {
    isLoading.value = false
  })
})

const findReferencia = (id: number) => referencias.value.find((a) => a.id === id)

const talentos: Ref<Talento[]> = ref([])

const talentosGerais = computed(() => talentos.value.filter((a) => a.tracos.includes(Tracos.GERAL) && !a.tracos.includes(Tracos.PERICIA)))
const talentosPericia = computed(() => talentos.value.filter((a) => a.tracos.includes(Tracos.PERICIA)))

const talento: ComputedRef = computed(() => {
  if (route.query.id === undefined) return undefined
  const id = Number(route.query.id)
  const categoria = String(route.query.categoria)
  switch(categoria){
    case 'gerais':
      return talentosGerais.value.find((a) => a.id === id)
    case 'pericia':
      return talentosPericia.value.find((a) => a.id === id)
    default:
      return talentos.value.find((a) => a.id === id)
  }
});

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
]);
</script>
