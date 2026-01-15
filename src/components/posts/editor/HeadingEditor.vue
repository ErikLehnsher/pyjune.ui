<script setup>
const props = defineProps({
  block: Object
})
</script>

<template>
  <h1
    contenteditable
    class="heading-editor"
    @input="block.text = $event.target.innerText"
  >
    {{ block.text }}
  </h1>
</template>

<style scoped>
.heading-editor {
  font-size: 2rem;
  font-weight: 600;
  outline: none;
}
</style>
