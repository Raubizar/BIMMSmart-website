<template>
  <p :class="[ computedSize, 'font-weight-bold', props.color, props.spacing ]">
    <slot />
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  color:    { type: String, default: 'text-primary' },
  spacing:  { type: String, default: 'mb-2' },
  size:     { type: String, default: null }
})

const { mobile } = useDisplay()

// Compute CSS class for typography size, allowing shorthand like "h2" or full "text-h2"
const computedSize = computed(() => {
  if (props.size) {
    return props.size.startsWith('text-') ? props.size : `text-${props.size}`
  }
  return mobile ? 'text-h5' : 'text-h3'
})
</script>