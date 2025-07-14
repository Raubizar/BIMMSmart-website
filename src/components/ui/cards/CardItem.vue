<template>
  <v-sheet
    color="transparent"
    :rounded="borderRadius"
    class="fill-height card-hover"
    elevation="0"
    :style="cardStyle"
  >
    <v-card
      color="transparent"
      variant="flat"
      class="pt-6 pb-6 px-4 d-flex flex-column align-start card-content"
    >
      <v-icon
        v-if="item.icon"
        :color="iconColor"
        :size="iconSize"
        class="mb-3"
      >
        {{ item.icon }}
      </v-icon>

      <TextHeadline
        v-if="item.title"
        :color="theme.headlineColor"
        :size="mobile ? 'h6' : 'h5'"
        class="mb-0"
      >
        {{ item.title }}
      </TextHeadline>

      <TextParagraph
        v-if="item.description"
        :color="theme.paragraphColor"
        :size="mobile ? 'subtitle-1' : 'h6'"
        class="mt-0"
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
  iconSize: { type: [String, Number], default: 48 },
  borderRadius: { type: String, default: '0' }, // BIM usa bordas quadradas
  borderColor: { type: String, default: '' }
});

const { mobile } = useDisplay();

// Cor do ícone baseada no tema
const iconColor = computed(() => {
  return props.theme.headlineColor || 'grey-darken-3';
});

// Estilo do card com bordas degradê
const cardStyle = computed(() => {
  return {
    position: 'relative',
    backgroundColor: props.theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
    '--card-border-gradient': props.theme.cardBorderGradient || (props.theme.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.6)'),
    '--card-border-width': props.theme.cardBorderWidth || '2px'
  };
});
</script>

<style scoped>
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.card-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--card-border-width, 2px);
  background: var(--card-border-gradient, rgba(0,0,0,0.6));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

/* Bordas para temas escuros */
.v-theme--dark .card-hover::before {
  background: var(--card-border-gradient, rgba(255,255,255,0.25));
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  elevation: 4;
}

.card-content {
  transition: all 0.3s ease;
}

.card-hover:hover .card-content {
  transform: scale(1.02);
}

@media (max-width: 960px) {
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    elevation: 2;
  }
}
</style>