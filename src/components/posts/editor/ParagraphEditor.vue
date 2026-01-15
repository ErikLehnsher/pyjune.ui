<template>
    <div contenteditable class="paragraph-editor" @input="onInput" @keydown.enter.prevent="onEnter">
        {{ block.text }}
    </div>
</template>

<script setup>
const props = defineProps({
    block: Object
})
const emit = defineEmits(['input', 'enter'])

const onInput = (e) => {
    emit('input', { text: e.target.innerText })
}

const onEnter = () => {
    emit('enter')
}
</script>
