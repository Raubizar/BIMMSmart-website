<template>
  <v-container
    fluid
    class="ma-0 min-height-screen pa-0"
    :class="theme.backgroundColor"
    :style="theme.backgroundStyle"
  >
    <div class="content-wrapper" :class="mobile ? 'px-6 pb-24' : 'px-8 pb-16'" :style="{ paddingTop: topPadding }">
      <!-- Mobile Layout -->
      <template v-if="mobile">
        <v-row class="align-center justify-center text-center">
          <v-col cols="12" class="pb-8">
            <slot name="logo"></slot>
            <v-img
              v-if="content.image"
              :src="content.image"
              :alt="content.imageAlt"
              class="mx-auto mb-8"
              :max-width="320"
              contain
            />
            
            <TextHeadline
              :color="theme.headlineColor"
              size="h2"
              spacing="mb-4"
              class="line-height-tight font-weight-bold"
              style="font-size: 2.5rem !important;"
            >
              {{ content.headline.mobile }}
            </TextHeadline>
            
            <TextParagraph
              :color="theme.paragraphColor"
              size="h6"
              spacing="mb-8"
              class="mx-auto"
              style="max-width: 500px; opacity: 0.85; font-size: 1.25rem !important;"
            >
              {{ content.subheadline.mobile }}
            </TextParagraph>
            
            <div class="d-flex justify-center">
              <v-btn
                variant="flat"
                size="x-large"
                rounded="0"
                elevation="0"
                class="hero-modern-btn px-12 py-6"
                @click="openModal"
              >
                <span class="text-h6 font-weight-bold text-uppercase" style="letter-spacing: 1px;">
                  {{ content.cta }}
                </span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>

      <!-- Desktop Layout -->
      <template v-else>
        <v-row class="align-center" style="min-height: 75vh;">
          <v-col cols="12" md="6" class="pr-8 d-flex align-center">
            <div class="hero-content">
              <slot name="logo"></slot>
              <TextHeadline
                :color="theme.headlineColor"
                size="h1"
                spacing="mb-8"
                class="line-height-tight font-weight-bold"
                style="max-width: 700px; font-size: 4rem !important;"
              >
                {{ content.headline.desktop }}
              </TextHeadline>
              
              <TextParagraph
                :color="theme.paragraphColor"
                size="h5"
                spacing="mb-8"
                class="font-weight-regular"
                style="max-width: 600px; opacity: 0.85; font-size: 1.5rem !important;"
              >
                {{ content.subheadline.desktop }}
              </TextParagraph>
              
              <v-btn
                variant="flat"
                size="x-large"
                rounded="0"
                elevation="0"
                class="hero-modern-btn px-12 py-6"
                @click="openModal"
              >
                <span class="text-h6 font-weight-bold text-uppercase" style="letter-spacing: 1px;">
                  {{ content.cta }}
                </span>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <v-img
              v-if="content.image"
              :src="content.image"
              :alt="content.imageAlt"
              class=""
              :max-width="500"
              contain
            />
          </v-col>
        </v-row>
      </template>
    </div>
  </v-container>
  
  <!-- Form Modal Roadmap -->
  <FormModalRoadmap
    v-model="showModal"
    @success="onFormSuccess"
    @error="onFormError"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import FormModalRoadmap from '@/components/ui/FormModalRoadmap.vue';

const props = defineProps({
  themeKey: { type: String, default: 'modernGrey' },
  content: { type: Object, default: () => cursoContent.hero },
  customTopPadding: { type: String, default: null }
});

const theme = getThemeConfig(props.themeKey);
const { mobile } = useDisplay();
const showModal = ref(false);

const content = props.content || cursoContent.hero;

const topPadding = computed(() => {
  if (props.customTopPadding) return props.customTopPadding
  return mobile.value ? '190px' : '140px'
})

function openModal() {
  showModal.value = true
}

function onFormSuccess() {
  console.log('Formulário enviado com sucesso!')
  // Redirecionamento já é feito pelo componente FormModalRoadmap
}

function onFormError(error) {
  console.error('Erro no envio:', error)
}
</script>

<style scoped>
.min-height-screen {
  min-height: 100vh;
  position: relative;
}

.line-height-tight {
  line-height: 1.1;
}

.hero-content {
  max-width: 600px;
}

/* Botão BIM - Laranja e quadrado */
.hero-modern-btn {
  background: linear-gradient(135deg, #fe5f04 0%, #e54e00 100%) !important;
  border: 2px solid #fe5f04 !important;
  color: white !important;
  position: relative;
  overflow: visible;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 8px 32px rgba(254, 95, 4, 0.4) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.hero-modern-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(254, 95, 4, 0.4), rgba(229, 78, 0, 0.3));
  border-radius: 0;
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: pulse-out-only 2s ease-out infinite;
}

.hero-modern-btn:hover {
  background: linear-gradient(135deg, #e54e00 0%, #fe5f04 100%) !important;
  border-color: #e54e00 !important;
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 16px 48px rgba(254, 95, 4, 0.6), 0 0 40px rgba(254, 95, 4, 0.3) !important;
}

.hero-modern-btn .v-btn__content {
  position: relative;
  z-index: 2;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.hero-modern-btn .v-btn__content span {
  line-height: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
  vertical-align: middle !important;
}

.hero-modern-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(254, 95, 4, 0.6);
  border-radius: 0;
  transform: translate(-50%, -50%);
  animation: border-pulse-adjusted 2s infinite;
  z-index: -2;
}

@keyframes border-pulse-adjusted {
  0% {
    transform: translate(-50%, -50%) scaleX(1) scaleY(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scaleX(1.2) scaleY(1.4);
    opacity: 0;
  }
}

@keyframes pulse-out-only {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 960px) {
  .hero-content {
    text-align: center;
  }
}

/* CSS global para botões */
:deep(.hero-modern-btn) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.hero-modern-btn .v-btn__content) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.hero-modern-btn .v-btn__content span) {
  line-height: 1 !important;
  vertical-align: middle !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>