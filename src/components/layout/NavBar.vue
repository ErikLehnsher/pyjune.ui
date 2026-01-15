<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import postService from '@/services/post.service'
const authStore = useAuthStore()
const router = useRouter()

const userOpen = ref(false)
const mobileOpen = ref(false)
const mobileSearchOpen = ref(false)
const creatingPost = ref(false)

const createNewPost = async () => {
    if (creatingPost.value) return
    creatingPost.value = true

    try {
        const res = await postService.createPost({
            title: 'Untitled',
            excerpt: '',
            content_json: null,
            html_content: '',
            status: 'draft',
            is_published: false,
        })

        const slug = res.data.slug
        if (!slug) {
            throw new Error('Post created but slug missing')
        }

        router.push(`/posts/${slug}/edit`)
    } catch (err) {
        console.error('Create draft post failed', err)
    } finally {
        creatingPost.value = false
    }
}
const toggleSearch = () => {
    mobileSearchOpen.value = !mobileSearchOpen.value
}
const user = computed(() => authStore.user)

const displayName = computed(() =>
    user.value?.profile?.display_name || user.value?.username
)

const avatar = computed(() =>
    user.value?.profile?.avatar_url || 'default-avatar.png'
)

const toggleUser = () => {
    userOpen.value = !userOpen.value
}

const toggleMobile = () => {
    mobileOpen.value = !mobileOpen.value
}

const logout = () => {
    authStore.logout()
    userOpen.value = false
    router.push('/login')
}
</script>

<template>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-inner">
                <!-- LEFT -->
                <div class="nav-left d-flex">
                    <router-link class="logo" to="/">
                        <img src="/logo_v3.svg" alt="Độc Xà Oa" />
                    </router-link>
                    <!-- SEARCH: only show when logged in -->
                    <div v-if="authStore.isAuth" class="nav-center align-items-end">
                        <div class="search-box">
                            <button class="search-toggle" @click="toggleSearch">
                                🔍
                            </button>
                            <input type="text" placeholder="Tìm bug Odoo, Python, công ty IT..." v-model="keyword"
                                @keyup.enter="onSearch" />
                        </div>
                    </div>
                    <!-- CENTER (DESKTOP + MOBILE MENU) -->
                    <div class="nav-center align-items-end" :class="{ open: mobileOpen }">
                        <router-link to="/posts" class="nav-link" @click="mobileOpen = false">
                            🐍 Odoo Bugs
                        </router-link>
                        <router-link to="/blogs" class="nav-link" @click="mobileOpen = false">
                            Blog
                        </router-link>
                    </div>
                </div>



                <!-- RIGHT -->
                <div class="nav-right">
                    <template v-if="authStore.isAuth">
                        <div class="user-menu">
                            <!-- CLICK → PROFILE -->
                            <router-link to="/me" class="user-trigger" :class="{ admin: user?.profile?.is_admin }">
                                <img :src="avatar" class="avatar" />
                                <span class="name">{{ displayName }}</span>
                            </router-link>

                            <!-- HOVER → DROPDOWN -->
                            <div class="nav-dropdown">
                                <router-link to="/me">
                                    🐍 Xà Muội
                                </router-link>

                                <hr />

                                <button v-if="user?.profile?.is_author || user?.profile?.is_admin"
                                        @click="createNewPost" class="dropdown-link">
                                        ✍️ New Post
                                    </button>

                                <hr />

                                <button @click="logout">🚪 Thoát</button>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <router-link class="nav-auth nav-auth--login" to="/login">Đăng Nhập</router-link>
                        <router-link class="nav-auth nav-auth--register" to="/register"
                            style="color:white; font-weight:500; padding:15px; border-radius: 30px;">Đăng
                            Ký</router-link>
                    </template>
                </div>


            </div>
        </div>
    </nav>
</template>
