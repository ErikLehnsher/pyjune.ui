import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ResizableImageView from '@/components/editor/ResizableImageView.vue'

export default Node.create({
  name: 'image',

  group: 'block',
  draggable: true,

  selectable: true,
  isolating: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: '50%' },
    }
  },
  addCommands() {
    return {
      setImage:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          })
        },
    }
  },
  parseHTML() {
    return [{ tag: 'img[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        style: `inline-size: ${HTMLAttributes.width}; max-inline-size: 100%;`,
      }),
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(ResizableImageView)
  },
})
