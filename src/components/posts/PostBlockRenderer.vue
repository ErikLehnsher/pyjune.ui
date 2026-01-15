<script setup>
import ParagraphBlock from './blocks/ParagraphBlock.vue'
import HeadingBlock from './blocks/HeadingBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import CodeBlock from './blocks/CodeBlock.vue'

defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

const resolveBlock = (block) => {
  switch (block.type) {
    case 'paragraph': return ParagraphBlock
    case 'heading': return HeadingBlock
    case 'image': return ImageBlock
    case 'code': return CodeBlock
    default: return ParagraphBlock
  }
}
</script>

<template>
  <div class="post-blocks">
    <component
      v-for="block in blocks"
      :key="block.id"
      :is="resolveBlock(block)"
      :block="block"
    />
  </div>
</template>
