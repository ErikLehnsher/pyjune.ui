<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import postService from '@/services/post.service'

const router = useRouter()

const creating = ref(false)

const form = ref({
  title: '',
  excerpt: '',
  category_id: null,
  tag_ids: [],
  status: 'draft',
  is_published: false,
})

const createPost = async () => {
  if (!form.value.title.trim()) return

  creating.value = true
  try {
    const res = await postService.createPost({
      title: form.value.title,
      excerpt: form.value.excerpt,
      category_id: form.value.category_id,
      tag_ids: form.value.tag_ids,

      // 🔥 QUAN TRỌNG
      content_json: null,
      html_content: '',

      status: form.value.status,
      is_published: form.value.status === 'published',
    })

    // 👉 sang editor
    router.push(`/posts/${res.data.slug}/edit`)
  } catch (err) {
    console.error('Create post failed', err)
  } finally {
    creating.value = false
  }
}
</script>


<template>
  <div class="container post-create">
    <h1>✍️ Create New Post</h1>

    <input
      v-model="form.title"
      placeholder="Post title"
    />

    <textarea
      v-model="form.excerpt"
      placeholder="Short description"
    />

    <select v-model="form.status">
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>

    <button :disabled="creating" @click="createPost">
      {{ creating ? 'Creating...' : 'Create' }}
    </button>
  </div>
</template>

