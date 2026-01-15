<script setup>
import { reactive, onMounted } from "vue"
import { useAuthStore } from "@/store/auth"
import authService from "@/services/auth.service"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  first_name: "",
  last_name: "",
  display_name: "",
  email: "",
})

const loading = reactive({ value: false })

onMounted(() => {
  if (authStore.user) {
    form.first_name = authStore.user.first_name || ""
    form.last_name = authStore.user.last_name || ""
    form.display_name = authStore.user.profile?.display_name || ""
    form.email = authStore.user.email || ""
  }
})

const submit = async () => {
  loading.value = true
  try {
    await authService.updateProfile(form)
    await authStore.fetchMe()
    router.push("/me")
  } catch (err) {
    alert("Update failed")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="edit-profile">
    <h1>✏️ Edit Profile</h1>

    <form @submit.prevent="submit">
      <div>
        <label>First name</label>
        <input v-model="form.first_name" />
      </div>

      <div>
        <label>Last name</label>
        <input v-model="form.last_name" />
      </div>
      <div>
        <label>Display name</label>
        <input v-model="form.display_name" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>

      <button type="submit" :disabled="loading.value">
        {{ loading.value ? "Saving..." : "Save" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.edit-profile {
  max-inline-size: 600px;
  margin: 40px auto;
}

form>div {
  margin-block-end: 12px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  inline-size: 100%;
  padding: 6px;
}
</style>
