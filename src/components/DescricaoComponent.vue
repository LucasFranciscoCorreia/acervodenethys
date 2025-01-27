<template>
  <div class="p-4">
    <div class="bg-title text-uppercase px-3 py-2 d-flex justify-content-between">
      <span>{{ title }}</span>
      <span>{{ tipo }} {{ nivel }}</span>
    </div>
    <div class="text-uppercase d-flex justify-content-left mt-2">
      <p class="trait" v-for="traco in descricaoTracos" :key="traco.id">{{ traco.titulo }}</p>
    </div>
    <p class="text-sm">
      <strong>Fonte:</strong> <span class="font-italic text-primary">SOURCE</span>
    </p>
    <hr />
    <p>{{ descricao }}</p>
    <div class="mt-2 bg-secondary text-white px-3 py-2 font-weight-bold rounded">Traços</div>
    <table class="w-100">
      <tbody>
        <tr v-for="descricao in descricaoTracos" :key="descricao.id">
          <td class="fixed-width">{{ descricao.titulo }}</td>
          <td class="description">{{ descricao.descricao }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { findTracoDescricao } from '@/data/utils'
import type { Tracos } from '@/enums/tracos'
import type TracosDescricao from '@/interfaces/TracosDescricao'

const props = defineProps<{
  title: string
  tracos: Tracos[]
  tipo: string
  nivel: number
  descricao: string
}>()

const descricaoTracos: TracosDescricao[] = props.tracos
  .map((el) => findTracoDescricao(el))
  .filter((el) => el != undefined)
</script>
<style scoped>
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
