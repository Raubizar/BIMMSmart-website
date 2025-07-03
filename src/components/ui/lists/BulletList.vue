<template>
  <li
    :class="[
      mobile ? 'text-subtitle-1' : 'text-h5',
      'font-weight-regular d-flex align-center',
      colorClass,
      spacing
    ]"
    style="list-style: none; padding-left: 0;"
  >
    <v-icon
      :icon="icon"
      :color="iconColor"
      size="small"
      class="me-1 mt-1"
    />
    <slot />
  </li>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { bulletThemes } from '@/styles/bulletThemes.js';

const props = defineProps({
  colorClass: { type: String, default: 'text-quartiary' },
  spacing: { type: String, default: 'mb-2' },
  themeKey: { type: String, default: 'default' },
});

const { mobile } = useDisplay();

const icon = bulletThemes[props.themeKey]?.icon || 'mdi-circle-small';
const iconColor = bulletThemes[props.themeKey]?.iconColor || 'primary';
</script>