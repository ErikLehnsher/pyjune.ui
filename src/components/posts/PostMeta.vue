<template>
    <div class="post-meta">
        <span>👤 {{ post.author_username }}</span>
        <span>🕒 {{ new Date(post.created_at).toLocaleDateString() }}</span>
        <span v-if="post.category">📂 {{ post.category.name }}</span>

        <div class="tags">
            <span v-for="tag in post.tags" :key="tag.id" class="tag">
                #{{ tag.name }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    post: Object
})
</script>
