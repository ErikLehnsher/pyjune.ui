<template>
  <NodeViewWrapper class="image-wrapper">
    <div class="image-box">
      <img
        :src="node.attrs.src"
        :style="{ width: node.attrs.width }"
        @mousedown.stop
      />

      <!-- resize handle -->
      <span class="resize-handle" @mousedown.prevent="startResize" />
    </div>
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['node', 'updateAttributes'])

let startX = 0
let startWidth = 0

const startResize = (e) => {
  startX = e.clientX
  startWidth = e.target.previousElementSibling.offsetWidth

  const onMove = (e) => {
    const diff = e.clientX - startX
    props.updateAttributes({
      width: Math.max(120, startWidth + diff) + 'px',
    })
  }

  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
}

.image-box {
  position: relative;
  display: inline-block;
  inline-size: auto;
}

img {
  display: block;
  max-inline-size: 100%;
  border-radius: 12px;
}

.resize-handle {
  position: absolute;
  inset-inline-end: -6px;
  inset-block-end: -6px;
  inline-size: 12px;
  block-size: 12px;
  background: #25e5eb;
  border-radius: 50%;
  cursor: se-resize;
}
</style>
