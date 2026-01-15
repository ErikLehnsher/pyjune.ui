<script setup>
const props = defineProps({
    block: Object
})

const onUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    block.preview = URL.createObjectURL(file)
    block.file = file
}
</script>

<template>
    <div class="image-editor" :style="{ inlineSize: block.width + '%' }">
        <input type="file" accept="image/*" @change="onUpload" />

        <img v-if="block.preview || block.image" :src="block.preview || block.image" />
    </div>
</template>

<style scoped>
.image-editor img {
    inline-size: 100%;
    border-radius: 6px;
}
</style>
