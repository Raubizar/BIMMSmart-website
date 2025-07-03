<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline & Intro -->
    <v-row :class="mobile ? 'pt-0' : 'pt-16'">
      <v-col cols="12" class="text-center">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.intro }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 2: "Aqui, você" intro -->
    <v-row>
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-2' : 'h5'"
          spacing="mb-6"
        >
          {{ content.subtitle }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 3: Modern Horizontal Cards Navigation -->
    <v-row>
      <v-col cols="12">
        <div class="cards-navigation-container">
          <!-- Navigation Buttons -->
          <v-btn
            icon
            size="x-large"
            class="nav-btn nav-btn-left"
            :disabled="scrollPosition <= 0"
            @click="scrollLeft"
            elevation="4"
          >
            <v-icon size="x-large" color="grey-darken-3">mdi-chevron-left</v-icon>
          </v-btn>
          
          <v-btn
            icon
            size="x-large"
            class="nav-btn nav-btn-right"
            :disabled="scrollPosition >= maxScroll"
            @click="scrollRight"
            elevation="4"
          >
            <v-icon size="x-large" color="grey-darken-3">mdi-chevron-right</v-icon>
          </v-btn>

          <!-- Draggable Cards Container -->
          <div 
            ref="scrollContainer"
            class="horizontal-scroll-container"
            @mousedown="startDrag"
            @mousemove="drag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @touchstart="startDrag"
            @touchmove="drag"
            @touchend="endDrag"
          >
            <div class="cards-wrapper" :style="{ transform: `translateX(-${scrollPosition}px)` }">
              <div
                v-for="(item, idx) in content.items"
                :key="idx"
                class="card-item"
              >
                <CardItemLarge :item="item" :theme="theme" />
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Zone 4: Benefits & Analogy -->
    <v-row class="pt-8">
      <v-col cols="12">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.benefits }}
        </TextParagraph>
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.analogy }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 5: Quote Final -->
    <v-row>
      <v-col cols="12" md="8" class="mx-auto text-center">
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-format-quote-close"
          iconColor="tertiary"
          :iconSize="48"
        >
          {{ content.quote }}
        </TextQuote>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import TextQuote from '@/components/ui/typography/TextQuote.vue';
import CardItemLarge from '@/components/ui/cards/CardItemLarge.vue';

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'darkPurple' } });
const theme = getThemeConfig(props.themeKey);
const content = cursoContent.diferencial;

// Drag and scroll logic
const scrollContainer = ref(null);
const scrollPosition = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startScrollLeft = ref(0);

const maxScroll = computed(() => {
  const cardWidth = mobile.value ? 296 : 344; // card + gap
  const containerWidth = scrollContainer.value?.offsetWidth || 0;
  const totalWidth = content.items.length * cardWidth;
  return Math.max(0, totalWidth - containerWidth);
});

function startDrag(e) {
  isDragging.value = true;
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  startScrollLeft.value = scrollPosition.value;
  if (scrollContainer.value) {
    scrollContainer.value.style.cursor = 'grabbing';
  }
}

function drag(e) {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const walk = (startX.value - x) * 1.5;
  const newPosition = startScrollLeft.value + walk;
  scrollPosition.value = Math.max(0, Math.min(newPosition, maxScroll.value));
}

function endDrag() {
  isDragging.value = false;
  if (scrollContainer.value) {
    scrollContainer.value.style.cursor = 'grab';
  }
}

function scrollLeft() {
  const cardWidth = mobile.value ? 296 : 344;
  scrollPosition.value = Math.max(0, scrollPosition.value - cardWidth);
}

function scrollRight() {
  const cardWidth = mobile.value ? 296 : 344;
  scrollPosition.value = Math.min(maxScroll.value, scrollPosition.value + cardWidth);
}
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}

.cards-navigation-container {
  position: relative;
  padding: 16px 0;
}

.horizontal-scroll-container {
  overflow: hidden;
  cursor: grab;
  user-select: none;
  padding: 16px 0;
}

.horizontal-scroll-container:active {
  cursor: grabbing;
}

.cards-wrapper {
  display: flex;
  gap: 24px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.card-item {
  flex: 0 0 320px;
  min-height: 280px;
}

/* Navigation Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px);
}

.nav-btn-left {
  left: -36px;
}

.nav-btn-right {
  right: -36px;
}

.nav-btn:hover {
  transform: translateY(-50%) scale(1.05);
}

.nav-btn:disabled {
  opacity: 0.3;
}

/* Mobile adjustments */
@media (max-width: 960px) {
  .card-item {
    flex: 0 0 280px;
    min-height: 240px;
  }
  
  .cards-wrapper {
    gap: 16px;
  }
  
  .nav-btn-left {
    left: -28px;
  }
  
  .nav-btn-right {
    right: -28px;
  }
}
</style>