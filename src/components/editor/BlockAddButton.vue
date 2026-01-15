<template>
  <button class="block-add" :style="style" @click="$emit('open')">
    +
  </button>
</template>

<script setup>
defineProps({
  style: Object,
})
</script>

<style scoped>
.block-add {
  position: absolute;
  inline-size: 28px;
  block-size: 28px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
