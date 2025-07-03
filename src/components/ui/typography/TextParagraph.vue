<template>
  <p :class="[ computedSize, 'font-weight-regular', color, spacing ]">
    <slot />
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

// const props = defineProps({
//   color:    { type: String, default: 'text-quartiary' },
//   spacing:  { type: String, default: 'mb-4' },
//   size:     { type: String, default: null }
// })
const { color, spacing, size } = defineProps({
  color:    { type: String, default: 'text-quartiary' },
  spacing:  { type: String, default: 'mb-4' },
  size:     { type: String, default: null }
})

const { mobile } = useDisplay()

// Compute CSS class for typography size, allowing shorthand like "h5"
const computedSize = computed(() => {
  if (size) {
    return size.startsWith('text-') ? size : `text-${size}`
  }
  return mobile ? 'text-subtitle-1' : 'text-h5'
})
</script>