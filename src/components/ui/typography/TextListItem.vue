<template>
  <li :class="[
    mobile ? 'text-subtitle-1' : 'text-h5',
    'font-weight-regular',
    colorClass,
    spacing
  ]">
    • <slot />
  </li>
</template>

<script setup>
import { useDisplay } from 'vuetify';
const props = defineProps({
  colorClass: { type: String, default: 'text-quartiary' },
  spacing: { type: String, default: 'mb-2' }
});
const { mobile } = useDisplay();
</script>