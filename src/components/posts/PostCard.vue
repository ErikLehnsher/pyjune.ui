<script setup>
defineProps({
    post: Object
})
</script>

<template>
    <article class="post-card">
        <router-link :to="`/posts/${post.slug}`">
            <h2 class="post-card__title">{{ post.title }}</h2>
        </router-link>

        <div class="post-card__meta">
            <span class="author">{{ post.author_username }}</span>
            <time>{{ new Date(post.created_at).toLocaleDateString() }}</time>
        </div>

        <p class="post-card__excerpt">{{ post.excerpt }}</p>

        <div class="post-card__tags">
            <span v-for="tag in post.tags" :key="tag.id">
                #{{ tag.name }}
            </span>
        </div>
    </article>
</template>
