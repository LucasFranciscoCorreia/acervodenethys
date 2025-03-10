<template>
  <h1>{{ title }}</h1>
  <div style="margin-right: 3em">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in tableContent" :key="element.id">
          <td>
            <RouterLink :to="'talentos?id=' + element.id">{{ element.titulo }}</RouterLink>
          </td>
          <td v-for="column in columns?.slice(1)" :key="column.key">
            {{ element[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type Ancestralidade from '@/interfaces/Ancestralidade'
import type Arma from '@/interfaces/Arma'
import type Column from '@/interfaces/Column'
import type Prop from '@/interfaces/Prop'
import type Talento from '@/interfaces/Talento'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps({
  title: String,
  columns: Array<Column>,
  content: Array<Talento | Arma>,
  to: String,
})

const tableContent: Ref<Array<Prop>> = ref([])

const tableTitle = (el: Talento | Arma | Ancestralidade) => {
  if ('titulo' in el) {
    return el.titulo
  } else if ('arma' in el) {
    return el.arma
  } else {
    return el.ancestralidade
  }
}

onMounted(() => {
  const content: Array<Prop> =
    props.content?.map((el) => {
      const row: Prop = {
        id: el.id,
        titulo: tableTitle(el),
      }
      props.columns?.slice(1).forEach((col: Column) => {
            console.log(col.key);
          row[col.key] = (el as any)[col.key]
        })
      console.log(row);
      return row
    }) ?? ([] as Prop[])
  tableContent.value = content
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-right: 1em;
}

th,
td {
  padding: 0.5em; /* Add padding to create margin effect */
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
