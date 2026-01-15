<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import postService from '@/services/post.service'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
import BlockMenu from '@/components/editor/BlockMenu.vue'
import BlockAddButton from '@/components/editor/BlockAddButton.vue'
import ResizableImage from '@/extensions/ResizableImage'
/* ========================
  ROUTE / STATE
======================== */
const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)
const saving = ref(false)

const editor = ref(null)
const showPlus = ref(false)
const showBlockMenu = ref(false)

const plusStyle = ref({
  top: '0px',
  left: '0px',
})


// for plus button
const updatePlusPosition = () => {
  if (!editor.value) return

  const { state, view } = editor.value
  const { $from } = state.selection


  if ($from.depth === 0) {
    showPlus.value = false
    return
  }

  const pos = $from.before($from.depth)
  const node = view.nodeDOM(pos)

  if (!(node instanceof HTMLElement)) {
    showPlus.value = false
    return
  }

  const rect = node.getBoundingClientRect()

  plusStyle.value = {
    top: rect.top + window.scrollY + 'px',
    left: rect.left - 36 + 'px',
  }

  showPlus.value = true
}



/* ========================
  FETCH POST
======================== */
const fetchPost = async () => {
  loading.value = true

  const res = await postService.getPostDetail(route.params.slug)
  post.value = res.data

  if (editor.value) {
    editor.value.destroy()
  }

  editor.value = new Editor({
    autofocus: false,
    extensions: [
      StarterKit,
      // Image.configure({
      //   allowBase64: true,
      // }),
      ResizableImage.configure({
        allowBase64: true,
      }),
    ],
    // 🔥 CHỖ QUAN TRỌNG
    content: post.value.html_content || '<p></p>',
    onSelectionUpdate: updatePlusPosition,
  })

  loading.value = false
}


/* ========================
  SAVE
======================== */
const savePost = async () => {
  saving.value = true
  await postService.updatePost(post.value.slug, {
    title: post.value.title,
    excerpt:post.value.excerpt,
    content_json: editor.value.getJSON(),
    html_content: editor.value.getHTML(),
  })
  router.push(`/posts/${post.value.slug}`)
}

/* ========================
  LIFECYCLE
======================== */
onMounted(fetchPost)
onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <div class="post-edit">
    <div v-if="loading">Loading...</div>

    <div v-else class="editor-wrapper">
      <!-- <input v-model="post.title" class="title-input" placeholder="Post title" /> -->
      <textarea v-model="post.title" class="title-input" placeholder="Post title" />
      <!-- <input v-model="post.excerpt" class="excerpt-input" placeholder="Post excerpt" /> -->
      <textarea v-model="post.excerpt" class="excerpt-input" placeholder="Post excerpt" />
      <EditorContent :editor="editor" class="editor" />

      <!-- PLUS DROPDOWN -->
      <BlockAddButton v-if="showPlus" :style="plusStyle" @open="showBlockMenu = true" />

      <BlockMenu v-if="showBlockMenu" :editor="editor" :style="{
        top: plusStyle.top,
        left: `calc(${plusStyle.left} + 40px)`,
      }" @close="showBlockMenu = false" />



      <div class="actions">
        <button class="action-button" @click="savePost" :disabled="saving">
          💾 Save
        </button>
      </div>
    </div>
  </div>
</template>