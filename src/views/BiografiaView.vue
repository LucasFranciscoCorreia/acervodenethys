<template>
  <div v-if="!biografia">
    <div class="card-row">
      <div v-for="biografia in collectBiografiasByName" :key="biografia.biografia">
        <CardComponent
          :link-to="'biografias?id=' + biografia.href"
          :title="biografia.biografia"
          :descricao="biografia.descricao"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ biografia.biografia }}</h1>
      <p><span v-html="biografia.explicacao"></span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import { collectBiografiasByName, findBiografia } from '@/data/utils'
import type Biografia from '@/interfaces/Biografia'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const biografia: Ref<Biografia | undefined> = ref(findBiografia(String(route.query.id)))

watch(
  () => route.query.id,
  (newBiografia) => {
    const background = findBiografia(String(newBiografia))
    if (!background) {
      biografia.value = undefined
    } else {
      biografia.value = background
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.card-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em; /* Adjust the gap between cards as needed */
  margin-top: 1em;
}
</style>
