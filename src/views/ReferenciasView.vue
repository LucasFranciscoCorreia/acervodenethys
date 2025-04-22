<template>
  <div v-if="!referencia">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="referencia in referencias" :key="referencia.id">
          <td>
            <RouterLink :to="'/referencias?id=' + referencia.id">{{
              referencia.titulo
            }}</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <DescricaoComponent v-else :title="referencia.titulo" descricao="" />
</template>

<script lang="ts" setup>
import type Referencia from '@/interfaces/Referencia'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import referencias from '@/data/referencias.json'
import { findReferencia } from '@/data/utils'
import DescricaoComponent from '@/components/DescricaoComponent.vue'

const route = useRoute()
const referencia: Ref<Referencia | undefined> = ref(findReferencia(Number(route.query.id)))

watch(
  () => route.query.id,
  (newReferencia) => {
    const source = findReferencia(Number(newReferencia))
    if (!source) {
      referencia.value = undefined
    } else {
      referencia.value = source
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
