<template>
  <div class="block-menu" :style="style" ref="menuRef" @click.stop>
    <button v-for="item in items" :key="item.type" class="item" @click="apply(item.type)" :title="item.label">
      <span class="icon">{{ item.icon }}</span>
      <span class="label">{{ item.label }}</span>
    </button>

    <!-- hidden input for upload -->
    <input ref="fileInput" type="file" accept="image/*" hidden @change="uploadImage" />
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'


const menuRef = ref(null)

const handleClickOutside = (e) => {
  if (!menuRef.value) return

  if (!menuRef.value.contains(e.target)) {
    emit('close')
  }
}
const props = defineProps({
  editor: Object,
  style: Object,
})

const emit = defineEmits(['close'])

const fileInput = ref(null)

/* ========================
  MENU CONFIG (QUAN TRỌNG)
======================== */
const items = [
  { type: 'paragraph', icon: 'T', label: 'Text' },

  { type: 'h1', icon: 'H1', label: 'Heading 1' },
  { type: 'h2', icon: 'H2', label: 'Heading 2' },
  { type: 'h3', icon: 'H3', label: 'Heading 3' },

  { type: 'bulletList', icon: '•', label: 'Bullet List' },
  { type: 'orderedList', icon: '1.', label: 'Numbered List' },
  { type: 'taskList', icon: '☑', label: 'To-do List' },

  { type: 'quote', icon: '❝', label: 'Quote' },
  { type: 'code', icon: '</>', label: 'Code Block' },
  { type: 'divider', icon: '―', label: 'Divider' },

  { type: 'imageUrl', icon: '🖼', label: 'Image (URL)' },
  { type: 'imageUpload', icon: '⬆', label: 'Upload Image' },
]

/* ========================
  APPLY ACTION
======================== */
const apply = (type) => {
  const editor = props.editor
  if (!editor) return

  switch (type) {
    case 'paragraph':
      editor.chain().focus().setParagraph().run()
      break

    case 'h1':
      editor.chain().focus().toggleHeading({ level: 1 }).run()
      break
    case 'h2':
      editor.chain().focus().toggleHeading({ level: 2 }).run()
      break
    case 'h3':
      editor.chain().focus().toggleHeading({ level: 3 }).run()
      break

    case 'bulletList':
      editor.chain().focus().toggleBulletList().run()
      break

    case 'orderedList':
      editor.chain().focus().toggleOrderedList().run()
      break

    case 'taskList':
      editor.chain().focus().toggleTaskList().run()
      break

    case 'quote':
      editor.chain().focus().toggleBlockquote().run()
      break

    case 'code':
      editor.chain().focus().toggleCodeBlock().run()
      break

    case 'divider':
      editor.chain().focus().setHorizontalRule().run()
      break

    case 'imageUrl': {
      const url = prompt('Image URL')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
      break
    }

    case 'imageUpload':
      fileInput.value?.click()
      return // ⛔ chưa close menu
  }

  emit('close')
}

/* ========================
  IMAGE UPLOAD (LOCAL)
======================== */
const uploadImage = (e) => {
  const file = e.target.files?.[0]
  if (!file) {
    emit('close')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    props.editor
      .chain()
      .focus()
      .setImage({ src: reader.result })
      .run()

    emit('close')
    e.target.value = ''
  }

  reader.readAsDataURL(file)
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>


<style scoped>
.block-menu {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .12);
  min-inline-size: 220px;
  max-block-size: 220px;
  overflow-y: auto;
}

/* Chrome / Edge / Safari */
.block-menu::-webkit-scrollbar {
  inline-size: 0;
  block-size: 0;
}

/* Firefox */
.block-menu {
  scrollbar-width: none;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  inline-size: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  text-align: start;
}

.item:hover {
  background: #f3f4f6;
}

.icon {
  inline-size: 28px;
  text-align: center;
  font-weight: 600;
  opacity: 0.7;
}

.label {
  font-size: 14px;
}
</style>
