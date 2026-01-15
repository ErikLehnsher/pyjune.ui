<script setup>
import { onMounted, computed } from "vue"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)
const loading = computed(() => authStore.loading)

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchMe()
  }
})

const goEdit = () => {
  router.push("/me/profile")
}
</script>

<template>
  <div class="me-page">
    <h1>👤 My Profile</h1>

    <div v-if="loading">Loading...</div>

    <div v-else-if="user" class="profile-card">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>First name:</strong> {{ user.first_name }}</p>
      <p><strong>Last name:</strong> {{ user.last_name }}</p>

      <button @click="goEdit">✏️ Edit profile</button>
    </div>

    <div v-else>
      <p>Not logged in</p>
    </div>
  </div>
</template>

<style scoped>
.me-page {
  max-width: 600px;
  margin: 40px auto;
}

.profile-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  margin-top: 16px;
}
</style>
