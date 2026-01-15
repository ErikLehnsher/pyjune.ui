<script setup>
import { ref, onMounted } from 'vue'
import  postService  from '@/services/post.service'
import PostCard from '@/components/posts/PostCard.vue'

const posts = ref([])
const loading = ref(true)

const fetchPosts = async () => {
    loading.value = true
    const res = await postService.getPosts()
    posts.value = res.data
    loading.value = true

}

onMounted(fetchPosts)
</script>
<template>
    <section class="posts-page">
        <h1 class="page-title">Odoo bugs & technical Debug</h1>
        <div class="post-layout">
            <aside class="post-filter">

                <p class="filter-title">Filters</p>
            </aside>
            <main class="post-list">
                <PostCard v-for="post in posts" :key="post.id" :post="post" />
            </main>
        </div>
    </section>
</template>