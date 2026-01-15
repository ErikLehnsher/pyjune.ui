<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import postService from '@/services/post.service'

import PostHeader from '@/components/posts/PostHeader.vue'
import PostMeta from '@/components/posts/PostMeta.vue'
// import PostCard from '@/components/posts/PostCard.vue'
const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)

const fetchPost = async () => {
    try {
        const res = await postService.getPostDetail(route.params.slug)
        post.value = res.data
    } catch (err) {
        console.error('Failed to load post', err)
    } finally {
        loading.value = false
    }
}

const goEdit = () => {
    router.push(`/posts/${post.value.slug}/edit`)
}

onMounted(fetchPost)
</script>

<template>
    <div class="post-detail container">
        <div v-if="loading">Loading...</div>

        <article v-else-if="post" class="post-detail__article">
            <button class="edit-btn" @click="goEdit">✏️ Edit</button>

            <PostHeader :title="post.title" />
            <PostMeta :post="post" />
            <div class="post-detail__excerpt">
                <p>{{ post.excerpt }}</p>
            </div>

            <!--Tip-tap rendered HTML -->
            <div class="tiptap-content" v-html="post.html_content" />
        </article>
    </div>
</template>
