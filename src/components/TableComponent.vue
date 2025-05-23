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
            <RouterLink :to="to + '?id=' + element.id">{{ element.titulo }}</RouterLink>
          </td>
          <td v-for="column in columns?.slice(1)" :key="column.key">
            <span v-if="column.key !== 'tracos'" v-html="element[column.key]"></span>
            <div v-else style="display: inline; white-space: nowrap">
              <span
                v-for="(traco, index) in element.tracos"
                :key="traco.id"
                style="white-space: nowrap"
              >
                <RouterLink :to="'/tracos?id=' + traco.id">
                  {{ traco.titulo }}
                </RouterLink>
                <span v-if="index < element.tracos.length - 1">, </span>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { findTracoDescricao } from '@/data/utils'
import type { Tracos } from '@/enums/tracos'
import type AcaoAtividade from '@/interfaces/AcaoAtividade'
import type Arma from '@/interfaces/Arma'
import type Armadura from '@/interfaces/Armadura'
import type Column from '@/interfaces/Column'
import type EquipamentoAventura from '@/interfaces/EquipamentoAventura'
import type Escudo from '@/interfaces/Escudo'
import type Magia from '@/interfaces/Magia'
import type Prop from '@/interfaces/Prop'
import type Talento from '@/interfaces/Talento'
import type TracosDescricao from '@/interfaces/TracosDescricao'
import { ref, watch, type Ref } from 'vue'

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  columns: {
    type: Array<Column>,
    required: true,
  },
  content: {
    type: Array<
      Talento | Arma | Armadura | Escudo | EquipamentoAventura | Talento | AcaoAtividade | Magia
    >,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
})

const tableContent: Ref<Array<Prop>> = ref([])

const tableTitle = (
  el: Talento | Arma | Armadura | Escudo | EquipamentoAventura | Talento | AcaoAtividade | Magia,
) => {
  if ('titulo' in el) {
    return el.titulo
  } else if ('arma' in el) {
    return el.arma
  } else if ('escudo' in el) {
    return el.escudo
  } else if ('armadura' in el) {
    return el.armadura
  } else if ('magia' in el) {
    return el.magia
  } else {
    return el.nome
  }
}

const updateTableContent = () => {
  const content: Array<Prop> =
    props.content?.map(
      (
        el:
          | Talento
          | Arma
          | Armadura
          | Escudo
          | EquipamentoAventura
          | Talento
          | AcaoAtividade
          | Magia,
      ) => {
        const row: Prop = {
          id: el.id,
          titulo: tableTitle(el),
        }
        props.columns?.slice(1).forEach((col: Column) => {
          if (el.hasOwnProperty(col.key)) {
            row[col.key] = (el as never)[col.key]
          }
          if (col.key === 'dano' && 'dadoDano' in el) {
            row['dano'] = '1d' + (el as Arma).dadoDano + ' ' + (el as Arma).tipoDano
          }
          if (col.key === 'preco' && 'preco' in el) {
            const pc: number = el.preco % 10
            const pp: number = Math.floor(el.preco / 10) % 10
            const po: number = Math.floor(el.preco / 100) % 10
            row['preco'] =
              `${po > 0 ? po + ' po ' : ''}${pp > 0 ? pp + ' pp ' : ''}${pc > 0 ? pc + ' pc' : ''}`.trim()
          }
          if (col.key === 'volume' && 'volume' in el) {
            row['volume'] = el.volume === 0 ? '-' : el.volume === 0.1 ? 'L' : el.volume
          }
          if (col.key === 'maos' && 'maos' in el) {
            if ('equipado' in el && el.equipado) row['maos'] = '2 (1 se equipado)'
            else row['maos'] = el.maos === 0 ? '1' : el.maos === 1 ? '1+' : el.maos
          }
          if (col.key === 'tracos' && 'tracos' in el) {
            row['tracos'] = (el as Talento).tracos
              .map((traco: Tracos): TracosDescricao | undefined => findTracoDescricao(traco))
              .filter((traco: TracosDescricao | undefined) => traco)
          }
          if (col.key === 'magia' && 'magia' in el) {
            row['magia'] = (el as Magia).magia
          }
        })
        return row
      },
    ) ?? ([] as Prop[])
  tableContent.value = content
}

watch(
  () => props.content,
  () => {
    updateTableContent()
  },
  { immediate: true },
)

updateTableContent()
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
