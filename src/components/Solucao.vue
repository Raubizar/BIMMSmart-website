<template>
  <v-container
    fluid
    class="pa-0 ma-0 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Título e Subtítulo -->
    <v-row :class="mobile ? 'pt-0' : 'pt-16'">
      <v-col cols="12" class="text-center">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h3' : 'h2'"
          spacing="mb-4"
        >
          O curso que prepara você para coordenar no mundo real!
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          12 semanas de imersão prática: simulações, desafios e feedback como num projeto real.
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 2: Introdução "Você vai" -->
    <v-row>
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-2' : 'h5'"
          spacing="mb-6"
        >
          Você vai viver esse dia a dia:
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 3: Grid de Experiências Otimizado -->
    <v-row class="d-flex justify-center" :class="mobile ? '' : 'px-8'">
      <v-col
        v-for="(exp, i) in experiencias"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        class="mb-6"
      >
        <v-card
          class="solution-card-modern h-100 pa-6"
          flat
          rounded="0"
          color="white"
        >
          <div class="d-flex flex-column align-start text-left h-100">
            <div class="icon-wrapper mb-4">
              <v-icon
                :icon="exp.icon"
                size="40"
                color="grey-darken-2"
              />
            </div>
            <h4 class="text-h5 font-weight-bold mb-3 text-grey-darken-4">
              {{ exp.title }}
            </h4>
            <p class="text-body-1 mb-0 text-grey-darken-2" style="line-height: 1.6;">
              {{ exp.description }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Zone 4: CTA -->
    <v-row class="pt-10">
      <v-col cols="12" class="text-center">
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
            Quero essa imersão
          </span>
        </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Zone 5: Citação Final -->
    <v-row class="pt-8">
      <v-col cols="12" md="8" class="mx-auto text-center">
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-format-quote-close"
          iconColor="tertiary"
          :iconSize="48"
        >
          “Isso não é um curso. É um campo de treinamento com simulação real!
          Você termina sabendo o que fazer — porque já vai ter feito.”
        </TextQuote>
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
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import TextQuote from '@/components/ui/typography/TextQuote.vue';
import CardItem from '@/components/ui/cards/CardItem.vue';
import FormModal from '@/components/ui/FormModal.vue';

const { mobile } = useDisplay();
const props = defineProps({ 
  themeKey: { type: String, default: 'darkPurple' },
  webhookUrl: { type: String, default: () => import.meta.env.VITE_MAKE_WEBHOOK_URL }
});
const theme = getThemeConfig(props.themeKey);
const showModal = ref(false);

function openModal() {
  showModal.value = true
}

function onFormSuccess() {
  console.log('Formulário enviado com sucesso!')
}

function onFormError(error) {
  console.error('Erro no envio:', error)
}

const experiencias = [
  { icon: 'mdi-television-ambient-light', title: 'Reuniões semanais', description: 'Como num escritório real, via MS Teams.' },
  { icon: 'mdi-clipboard-text-outline', title: 'Tarefas técnicas', description: 'Entregas, mudanças de escopo e exigências de cliente.' },
  { icon: 'mdi-file-tree', title: 'Seu próprio BEP', description: 'Configuração de CDE e preparação de modelos.' },
  { icon: 'mdi-vector-intersection', title: 'Clash Detection', description: 'Rodar e reportar conflitos com segurança.' },
  { icon: 'mdi-book-open-variant', title: 'RIBA & Padrões', description: 'Aplicar RIBA Plan of Work e padrões irlandeses.' },
  { icon: 'mdi-account-check', title: 'Feedback individual', description: 'Avaliações contínuas de um coordenador experiente.' },
  { icon: 'mdi-account-supervisor', title: 'Mentoria 1:1', description: 'Sessão personalizada de 45 min para alavancar sua carreira.' },
  { icon: 'mdi-certificate', title: 'Score & Diploma', description: 'Acompanhar evolução com indicadores e certificado.' }
];
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}

/* Botão BIM - Escuro e quadrado */
.hero-modern-btn {
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%) !important;
  border: 2px solid #1a1a1a !important;
  color: white !important;
  position: relative;
  overflow: visible;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
}

.hero-modern-btn:hover {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%) !important;
  border-color: #000000 !important;
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3) !important;
}

.hero-modern-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
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

/* Cards da solução modernos */
.solution-card-modern {
  transition: all 0.3s ease;
  border-left: 4px solid #424242;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.solution-card-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
  border-left-color: #616161;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>