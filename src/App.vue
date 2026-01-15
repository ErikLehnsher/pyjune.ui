<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRoute } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'

const authStore = useAuthStore()
const route = useRoute()

onMounted(() => {
  authStore.fetchMe()
})

const showNav = computed(() => !route.meta.hideNav)
const isFullPage = computed(() => route.meta.fullPage === true)
</script>

<template>
  <NavBar v-if="showNav && !authStore.loading" />

  <!-- NORMAL PAGE -->
  <div v-if="!isFullPage" class="container mt-4">
    <router-view v-if="!authStore.loading" />
  </div>

  <!-- FULL PAGE (login / register) -->
  <router-view
    v-else
    v-if="!authStore.loading"
  />
</template>
