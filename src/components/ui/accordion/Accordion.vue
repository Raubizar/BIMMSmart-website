<template>
  <v-expansion-panels accordion>
    <v-expansion-panel
      v-for="(item, idx) in items"
      :key="idx"
      flat
      rounded="lg"
      :class="[
        theme.backgroundColor,
        theme.isDark ? 'text-white' : 'text-dark'
      ]"
    >
      <v-expansion-panel-title
        :class="[ theme.headlineColor, 'font-weight-bold' ]"
      >
        {{ item.title }}
        <template #actions>
          <v-icon :class="theme.headlineColor">mdi-chevron-down</v-icon>
        </template>
      </v-expansion-panel-title>

      <v-expansion-panel-text :class="theme.paragraphColor">
        {{ item.description }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { getThemeConfig } from '@/helpers/blockThemes';
const props = defineProps({
  themeKey: { type: String, default: 'lightGrey' },
  items:    { type: Array,  default: () => [] }
});
const theme = getThemeConfig(props.themeKey);
</script>