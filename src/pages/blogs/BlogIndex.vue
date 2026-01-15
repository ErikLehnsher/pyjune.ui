<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
// import  Editor  from '@/components/editor/Editor.vue'
const editor = useEditor({
  content: '<p>Hello Tiptap 👋</p>',
  extensions: [
    StarterKit,
    Image.configure({
      inline: false,
      allowBase64: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
})

/* INSERT IMAGE VIA URL */
const insertImage = () => {
  const url = window.prompt('Image URL')
  if (!url) return

  editor.value
    .chain()
    .focus()
    .setImage({ src: url })
    .run()
}

/* INSERT IMAGE VIA FILE UPLOAD */
const onUploadImage = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    editor.value
      .chain()
      .focus()
      .setImage({ src: reader.result })
      .run()
  }
  reader.readAsDataURL(file)
}
</script>


<template>
  <Editor />
</template>



<style scoped>
.ProseMirror {
  min-block-size: 300px;
  padding: 24px 28px;
  font-family: Inter, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #fafafa;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror p {
  margin-block: 0.75em;
}

/* =========================
   PAGE WRAPPER
========================= */
.editor-page {
  max-inline-size: 720px;
  margin: 48px auto;
}

/* =========================
   TOOLBAR
========================= */
.toolbar {
  display: flex;
  gap: 8px;
  margin-block-end: 12px;
}

.toolbar button,
.upload-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s ease, color 0.15s ease;
}

.toolbar button:hover,
.upload-btn:hover {
  background: #f3f4f6;
}

.toolbar button.active {
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

/* ❌ remove ugly focus on buttons & inputs */
button:focus,
button:focus-visible,
input:focus,
input:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* =========================
   EDITOR CORE (IMPORTANT)
   MUST USE :deep()
========================= */
.editor :deep(.ProseMirror) {
  /* layout */
  min-block-size: 360px;
  padding: 24px 28px;

  /* look */
  background: #fafafa;
  border-radius: 16px;
  border: 1px solid #e5e7eb;

  /* typography */
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.01em;
  color: #111827;

  /* typing feel */
  caret-color: #111827;
  word-break: break-word;
}

/* ❌ remove hard focus border */
.editor :deep(.ProseMirror:focus),
.editor :deep(.ProseMirror:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}

/* =========================
   TEXT SPACING
========================= */
.editor :deep(.ProseMirror p) {
  margin-block: 0.75em;
}

.editor :deep(.ProseMirror h1) {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  margin-block: 1.2em 0.6em;
}

.editor :deep(.ProseMirror h2) {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin-block: 1em 0.5em;
}

/* =========================
   LIST
========================= */
.editor :deep(.ProseMirror ul),
.editor :deep(.ProseMirror ol) {
  padding-inline-start: 1.25em;
  margin-block: 0.8em;
}

.editor :deep(.ProseMirror li) {
  margin-block: 0.3em;
}

/* =========================
   IMAGE
========================= */
.editor :deep(.ProseMirror img) {
  max-inline-size: 100%;
  display: block;
  border-radius: 12px;
  margin-block: 16px;
}

/* =========================
   PLACEHOLDER
========================= */
.editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: "Write something…";
  color: #9ca3af;
  pointer-events: none;
  float: inline-start;
}

/* =========================
   TEXT ALIGN
========================= */
.editor :deep(.ProseMirror [data-text-align="left"]) {
  text-align: start;
}

.editor :deep(.ProseMirror [data-text-align="center"]) {
  text-align: center;
}

.editor :deep(.ProseMirror [data-text-align="right"]) {
  text-align: end;
}

.editor :deep(.ProseMirror [data-text-align="justify"]) {
  text-align: justify;
}
</style>
