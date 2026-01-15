<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import authService from '../../services/auth.service';

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
    username: '',
    password: '',
})

const submit = async () => {
    if (!form.username || !form.password) {
        alert('Please fill all fields.')
        return
    }
    try {
        await authStore.login(form)
        router.push('/')
    } catch (err) {
        alert('Invalid credentials')
    }

}
</script>

<template>
  <div class="auth-page">
    <!-- TOP LOGO -->
    <div class="logo auth-top mt-4 px-4">
      <router-link to="/"><img src="/logo_v3.svg" alt="Độc Xà Oa" /></router-link>
    </div>

    <!-- LEFT -->
    <div class="auth-left">
      <div class="auth-form" @keydown.enter.prevent="submit">
        <h2>Chào mừng xà thủ trở lại</h2>

        <input
          v-model="form.username"
          type="text"
          class="auth-input mb-2"
          placeholder="Email hoặc username"
        />

        <input
          v-model="form.password"
          type="password"
          class="auth-input mb-2"
          placeholder="Mật khẩu"
        />

        <button class="auth-button w-100" @click="submit">
          Đăng nhập
        </button>

        <span class="auth-text">
          Chưa có tài khoản?
          <router-link to="/register">Gia nhập xà động 🐍</router-link>
        </span>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="auth-right">
      <div class="video-frame">
        <video
          src="/videos/auth-preview-v3.mp4"
          autoplay
          muted
          loop
          playsinline
        ></video>
      </div>
    </div>
  </div>
</template>
