<template>
  <ul class="nav flex-column">
    <li v-for="link in links" :key="link.title" class="nav-item">
      <div>
        <RouterLink
          v-if="(link.sublinks?.length ?? 0) == 0"
          :to="link.href ?? '#'"
          class="nav-link"
          :class="{ active: isActive(link) }"
          @click="setActive(link)"
          >{{ link.title }}</RouterLink
        >
        <nav
          v-else
          class="nav-link"
          :class="{ active: isActive(link) }"
          @click="toggleSublinks(link)"
        >
          {{ link.title }}
        </nav>
      </div>
      <ul
        v-if="link.sublinks"
        class="nav flex-column ms-3 sublinks"
        :class="{ show: isActive(link) }"
      >
        <li v-for="sublink in link.sublinks" :key="sublink.title" class="nav-item w-100">
          <RouterLink
            :to="sublink.href"
            class="nav-link"
            :class="{ active: isSublinkActive(sublink) }"
            @click="setActive(sublink)"
          >
            {{ sublink.title }}
          </RouterLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import links from '@/data/links.json'
import type RouterLinkProp from '@/interfaces/RouterLinkProp'
import { findRoute } from '@/data/utils'

const route = useRoute()

const activeLink: Ref<RouterLinkProp | undefined> = ref<RouterLinkProp | undefined>(
  findRoute(route.path),
)

watch(
  () => route.path,
  (newPath: string) => {
    activeLink.value = findRoute(newPath)
  },
  { immediate: true },
)

const setActive = (link: RouterLinkProp) => {
  activeLink.value = link
}

const isActive = (link?: RouterLinkProp): boolean => {
  if (link == undefined || !activeLink.value) return false
  return (
    (activeLink.value.title === link.title ||
      link.sublinks?.some((sub) => sub.title === (activeLink.value?.title ?? undefined))) ??
    false
  )
}

const isSublinkActive = (link?: RouterLinkProp): boolean => {
  if (link == undefined || !activeLink.value) return false
  //console.log(link.title, activeLink.value.title, activeLink.value.title === link.title)
  return activeLink.value.title === link.title
}

const toggleSublinks = (link: RouterLinkProp) => {
  if (isActive(link)) {
    activeLink.value = undefined
  } else {
    activeLink.value = link
  }
}

onMounted(() => {
  activeLink.value = findRoute(route.path)
})
</script>

<style scoped>
.nav-link {
  color: #000;
  cursor: pointer; /* Ensure the cursor changes to pointer on hover */
}

.sublinks {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%; /* Ensure sublinks use 100% of the width */
}

.sublinks.show {
  max-height: 500px; /* Adjust this value based on the maximum height of your sublinks */
}

.nav-link:hover {
  color: #007bff;
}

.nav-link.active {
  font-weight: bold;
  color: #007bff;
}

.sublinks .nav-link.active {
  color: #ff0000; /* Different color for active sublink */
}

.nav {
  max-width: 250px; /* Adjust this value based on your layout */
}

.content {
  margin-left: 260px; /* Adjust this value based on the width of your sidebar */
}
</style>
