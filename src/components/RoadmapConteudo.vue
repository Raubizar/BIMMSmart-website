<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-4' : 'px-16']"
  >
    <!-- Ícone ou imagem central -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" class="text-center">
        <v-icon size="96" :color="theme.isDark ? 'white' : 'primary'">mdi-map-outline</v-icon>
      </v-col>
    </v-row>

    <!-- Título e frase de valor -->
    <v-row class="justify-center mb-4">
      <v-col cols="12" md="8" class="text-center">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ title }}
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-8"
        >
          Tenha clareza, evite erros e acelere sua evolução no universo BIM com um guia prático e direto ao ponto.
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Grid de benefícios -->
    <v-row class="justify-center">
      <v-col cols="12" md="10">
        <v-row class="equal-height-cards">
          <v-col cols="12" sm="6" md="4" v-for="(item, idx) in items" :key="idx" class="d-flex">
            <CardItem 
              :item="{
                icon: 'mdi-check-circle-outline',
                title: item.title,
                description: item.subtitle
              }" 
              :theme="theme"
              iconSize="32"
              borderRadius="lg"
              class="flex-grow-1"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Botão de ação -->
    <v-row class="justify-center mt-8">
      <v-col cols="12" class="text-center d-flex justify-center">
        <v-btn
          variant="flat"
          size="x-large"
          rounded="0"
          elevation="0"
          class="hero-modern-btn px-12 py-6 mx-auto"
          @click="openModal"
        >
          <span class="text-h6 font-weight-bold text-uppercase" style="letter-spacing: 1px;">
            Quero meu Roadmap BIM
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Form Modal Roadmap -->
  <FormModalRoadmap
    v-model="showModal"
    @success="onFormSuccess"
    @error="onFormError"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import CardItem from '@/components/ui/cards/CardItem.vue';
import FormModalRoadmap from '@/components/ui/FormModalRoadmap.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  themeKey: { type: String, default: 'modernGrey' },
  title: { type: String, default: 'O que você vai receber no Roadmap BIMM Smart?' }
});

const { mobile } = useDisplay();
const theme = getThemeConfig(props.themeKey);
const showModal = ref(false);

function openModal() {
  showModal.value = true;
}

function onFormSuccess() {
  console.log('Formulário enviado com sucesso!');
}

function onFormError(error) {
  console.error('Erro no envio:', error);
}
</script>

<style scoped>
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

/* Cards com altura igual */
.equal-height-cards {
  display: flex;
  flex-wrap: wrap;
}

.equal-height-cards > [class*='col-'] {
  display: flex;
  margin-bottom: 24px;
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
