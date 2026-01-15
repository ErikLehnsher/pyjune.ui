<template>
    <div class="blocks">
        <BlockItem v-for="(block, index) in modelValue" :key="block.id || index" :block="block" :index="index"
            @update="updateBlock" @add-after="addBlockAfter" />
    </div>
</template>

<script setup>
import BlockItem from './BlockItem.vue'

const props = defineProps({
    modelValue: Array
})
const emit = defineEmits(['update:modelValue'])

const updateBlock = (index, data) => {
    props.modelValue[index] = { ...props.modelValue[index], ...data }
}

const addBlockAfter = (index) => {
    props.modelValue.splice(index + 1, 0, {
        type: 'paragraph',
        text: ''
    })
}
</script>
