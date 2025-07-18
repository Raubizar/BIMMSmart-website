<template>
  <v-sheet
    color="transparent"
    :rounded="borderRadius"
    class="fill-height card-hover-large"
    elevation="0"
    :style="cardStyle"
  >
    <v-card
      color="transparent"
      variant="flat"
      class="pt-8 pb-8 px-6 d-flex flex-column align-start card-content h-100"
    >
      <v-icon
        v-if="item.icon"
        :color="iconColor"
        :size="iconSize"
        class="mb-4"
      >
        {{ item.icon }}
      </v-icon>

      <TextHeadline
        v-if="item.title"
        :color="theme.headlineColor"
        :size="mobile ? 'h5' : 'h4'"
        class="mb-3"
      >
        {{ item.title }}
      </TextHeadline>

      <TextParagraph
        v-if="item.description"
        :color="theme.paragraphColor"
        :size="mobile ? 'body-1' : 'h6'"
        class="mt-0 flex-grow-1"
      >
        {{ item.description }}
      </TextParagraph>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';

const props = defineProps({
  item: { type: Object, required: true },
  theme: { type: Object, required: true },
  iconSize: { type: [String, Number], default: 64 },
  borderRadius: { type: String, default: '0' }
});

const { mobile } = useDisplay();

const iconColor = computed(() => {
  return props.theme.headlineColor || 'grey-darken-3';
});

const cardStyle = computed(() => {
  return {
    position: 'relative',
    backgroundColor: props.theme.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
    '--card-border-gradient': props.theme.cardBorderGradient || (props.theme.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.6)'),
    '--card-border-width': props.theme.cardBorderWidth || '3px'
  };
});
</script>

<style scoped>
.card-hover-large {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.card-hover-large::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--card-border-width, 3px);
  background: var(--card-border-gradient, rgba(0,0,0,0.6));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.v-theme--dark .card-hover-large::before {
  background: var(--card-border-gradient, rgba(255,255,255,0.25));
}

.card-hover-large:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.card-content {
  transition: all 0.4s ease;
  height: 100%;
}

@media (max-width: 960px) {
  .card-hover-large:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}
</style>