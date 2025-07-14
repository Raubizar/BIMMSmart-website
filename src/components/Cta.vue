<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16 cta-with-isotipo"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline & Subheadline -->
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
          spacing="mb-4"
        >
          {{ content.subHeadline }}
        </TextParagraph>
      </v-col>
    </v-row>



    <!-- Zone 2: Investimento e Pré-requisito -->
    <v-row class="pt-2 justify-center">
      <v-col cols="12" md="4" class="text-center">
        <v-card class="pa-6 mb-4 cta-card cta-card-investment" color="green-lighten-5" flat>
          <div class="icon-container mb-4">
            <v-icon color="green" size="48">mdi-currency-eur</v-icon>
          </div>
          <h3 class="text-h5 font-weight-bold mb-3 text-green-darken-2">Investimento</h3>
          <p class="text-h5 font-weight-bold text-green-darken-3 mb-1">€300</p>
          <p class="text-body-2 text-green-darken-2">ou 12x de €30</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card class="pa-6 mb-4 cta-card cta-card-requirement" flat style="border: 2px solid #e0e0e0; background-color: transparent;">
          <div class="icon-container mb-4">
            <v-icon color="grey-darken-1" size="48">mdi-clipboard-check-outline</v-icon>
          </div>
          <h3 class="text-h5 font-weight-bold mb-3 text-grey-darken-2">Pré-requisito</h3>
          <p class="text-h6 text-grey-darken-2 mb-1">Atuar como BIM Modeler</p>
          <p class="text-body-1 text-grey-darken-2">com conhecimento em Revit</p>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Zone 3: Emphasis -->
    <v-row class="pt-2">
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-4"
        >
          {{ content.emphasis }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 4: Call to Action Button -->
    <v-row class="pb-8">
      <v-col cols="12" md="6" class="mx-auto text-center">
        <v-btn
          @click="openModal"
          block
          :color="theme.buttonColor"
          rounded="lg"
          height="64"
        >
          <span class="text-h5 font-weight-bold text-uppercase">
            {{ content.ctaText }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Form Modal -->
  <FormModal
    v-model="showModal"
    :webhookUrl="webhookUrl"
    @success="onFormSuccess"
    @error="onFormError"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import TextListItem from '@/components/ui/typography/TextListItem.vue';
import FormModal from '@/components/ui/FormModal.vue';

const props = defineProps({
  themeKey: { type: String, default: 'darkPurple' },
  webhookUrl: { type: String, required: true }
});

const emit = defineEmits(['openModal']);
const { mobile } = useDisplay();
const theme = getThemeConfig(props.themeKey);

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function onFormSuccess() {
  console.log('Formulário enviado com sucesso!')
}

function onFormError(error) {
  console.error('Erro no envio:', error)
}

const content = cursoContent.cta;
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}

.cta-card {
  min-height: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cta-card-investment:hover {
  background-color: #e8f5e8 !important;
}

.cta-card-requirement:hover {
  border-color: #bdbdbd !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cta-with-isotipo {
  position: relative;
  overflow: hidden;
}

.cta-with-isotipo::before {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 500px;
  height: 500px;
  background-image: url('/src/assets/isotipo-black.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.02;
  z-index: 0;
  pointer-events: none;
}

.cta-with-isotipo > * {
  position: relative;
  z-index: 1;
}
</style>