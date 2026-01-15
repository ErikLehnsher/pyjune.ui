<template>
    <div class="block">
        <component :is="component" :block="block" @input="onInput" @enter="onEnter" />
    </div>
</template>

<script setup>
import ParagraphEditor from '@/components/posts/editor/ParagraphEditor.vue'
import HeadingEditor from '@/components/posts/editor/HeadingEditor.vue'
import ImageEditor from '@/components/posts/editor/ImageEditor.vue'

const props = defineProps({
    block: Object,
    index: Number
})
const emit = defineEmits(['update', 'add-after'])

const componentMap = {
    paragraph: ParagraphEditor,
    heading: HeadingEditor,
    image: ImageEditor
}

const component = componentMap[props.block.type]

const onInput = (data) => {
    emit('update', props.index, data)
}

const onEnter = () => {
    emit('add-after', props.index)
}
</script>
