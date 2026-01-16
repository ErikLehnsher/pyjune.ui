<script setup>
import { reactive } from 'vue'
import AuthService from '@/services/auth.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
    display_name: '',
    email: '',
    password: '',
    password2: '',
})

const submit = async () => {
    if (!form.password || !form.password2 || !form.display_name || !form.email) {
        alert('Please fill all fields')
        return
    }
    if (form.password !== form.password2) {
        alert('password del match')
        return
    }
    try {
        AuthService.register({
            email: form.email,
            display_name: form.display_name,
            password: form.password,
        })
        router.push('/login')
    } catch (err) {
        console.error(err.response?.data)
        alert('register failed')
    }
}
</script>

<template>
    <div class="auth-page">
        <div class="logo auth-top mt-4 px-4">
            <img src="/logo_v3.svg" alt="Độc Xà Oa" />
        </div>
        <div class="auth-left">
            <div class="auth-form" @keydown.enter.prevent="submit">
                <h2>Chào các xà thủ</h2>

                <input  v-model="form.display_name" class="auth-input mb-2" placeholder="Tên hiển thị" />
                <input v-model="form.email" class="auth-input mb-2" placeholder="Email" />
                <input v-model="form.password" type="password" class="auth-input mb-2" placeholder="mật khẩu" />
                <input v-model="form.password2" type="password" class="auth-input mb-2"
                    placeholder="Nhập lại cái MK á" />

                <button class="auth-button w-100" @click="submit">
                    Đăng ký
                </button>
                <span class="auth-text">Có tài khoản rồi à? <router-link class="" to="/login">Đăng nhập đi</router-link></span>
            </div>
        </div>
        <div class="auth-right">
            <div class="video-frame">
                <video src="/videos/auth-preview-v3.mp4" autoplay muted loop playsinline></video>
            </div>
        </div>

    </div>
</template>
