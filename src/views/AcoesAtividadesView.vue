<template>
  <div v-if="!atividade">
    <TableComponent
      title="Ações e Atividades"
      :columns="columns"
      :content="atividades as AcaoAtividade[]"
      to="/acoesatividades"
    />
  </div>
  <DescricaoComponent
    v-else
    :title="atividade.nome"
    :tracos="atividade.tracos"
    :descricao="atividade.descricao"
    :sources="atividade.referencia.map((el) => findReferencia(el)).filter((el) => el != undefined)"
  />
</template>

<script setup lang="ts">
import { findAtividade } from '@/data/utils'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import atividades from '@/data/acoesAtividades.json'
import type AcaoAtividade from '@/interfaces/AcaoAtividade'
import TableComponent from '@/components/TableComponent.vue'
import type Column from '@/interfaces/Column'
import DescricaoComponent from '@/components/DescricaoComponent.vue'
import type Referencia from '@/interfaces/Referencia'

const route = useRoute()

const referencias: Ref<Referencia[]> = ref([])
const findReferencia = (id: number) => referencias.value.find((a) => a.id === id)

const atividade: Ref<AcaoAtividade | undefined> = ref(findAtividade(Number(route.query?.id)))

const columns: Ref<Column[]> = ref([
  {
    title: 'Ação/Atividade',
    key: 'nome',
  },
  {
    title: 'Descrição',
    key: 'descricao',
  },
  {
    title: 'Tipo',
    key: 'tipo',
  },
  {
    title: 'Requisitos',
    key: 'requisitos',
  },
  {
    title: 'Efeitos',
    key: 'efeitos',
  },
  {
    title: 'Acionamentos',
    key: 'acionamentos',
  },
  {
    title: 'Traços',
    key: 'tracos',
  },
])

watch(
  () => route.query.id,
  (newAtividade) => {
    const activity = findAtividade(Number(newAtividade))
    if (!activity) {
      atividade.value = undefined
    } else {
      atividade.value = activity
    }
  },
  { immediate: true },
)
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-right: 1em;
}

th,
td {
  padding: 0.5em;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
div.bg-title {
  background-color: rgb(115, 13, 13);
  border-radius: 0.25em;
}
div.bg-title > span {
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
p {
  margin-bottom: 0;
}
p.trait {
  color: white;
  background-color: #531004;
  border-color: #d5c489;
  border-style: solid;
  border-width: 0.3em;
  margin-left: 0.2em;
  margin-right: 0.2em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}
hr {
  margin-top: 0.5em;
  border-style: solid;
  line-height: 1em;
  height: 0.15em;
  background-color: black;
}
td {
  padding-left: 1em;
  padding-right: 1em;
}
td.fixed-width {
  width: 7.5em;
}
td.description {
  border-bottom: 0.1em solid black;
}
</style>
