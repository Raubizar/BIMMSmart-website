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
          :size="mobile ? 'h3' : 'h2'"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          size="h5"
          spacing="mb-4"
        >
          {{ content.subIntro }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 2: Cards Layout -->
    <div
      v-for="(stack, sidx) in content.stacks"
      :key="sidx"
      class="mb-12"
    >
      <v-row>
        <v-col cols="12" class="text-center mb-6">
          <TextHeadline
            :color="theme.headlineColor"
            size="h5"
            spacing="mb-0"
          >
            {{ stack.title }}
          </TextHeadline>
        </v-col>
      </v-row>
      
      <v-row class="justify-center">
        <v-col
          v-for="(item, idx) in stack.items"
          :key="idx"
          cols="12"
          sm="6"
          md="6"
          class="mb-4"
        >
          <v-card
            class="stack-card h-100 pa-4"
            flat
            :color="item.highlight ? 'grey-darken-3' : 'grey-lighten-5'"
            :class="{ 'highlight-card': item.highlight }"
          >
            <div class="d-flex align-start h-100">
              <div class="icon-container me-4 flex-shrink-0">
                <v-icon
                  :icon="item.icon"
                  size="40"
                  :color="item.highlight ? 'white' : 'primary'"
                />
              </div>
              <div class="content-container text-left">
                <h4 class="text-h6 font-weight-bold mb-2" :class="item.highlight ? 'text-white' : theme.headlineColor">
                  {{ item.title }}
                </h4>
                <p class="text-body-2 mb-0" :class="item.highlight ? 'text-white' : theme.paragraphColor">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Zone 3: Closing -->
    <v-row class="pt-8">
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          size="h6"
          spacing="mt-6"
        >
          {{ content.closing }}
        </TextParagraph>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import Accordion from '@/components/ui/accordion/Accordion.vue';
import lateralImage from '@/assets/stack-valor-image.png';

const { mobile, mdAndUp } = useDisplay();

const props = defineProps({
  themeKey: { type: String, default: 'lightPurple' }
});
const theme = getThemeConfig(props.themeKey);

const content = {
  ...cursoContent.stack,
  image: lateralImage
};

/*const oldContent = {
  headline: 'Tudo o que você leva',
  subIntro: 'Além do treinamento prático ao vivo e da simulação completa de um projeto BIM real, você também recebe:',
  stacks: [
    {
      title: 'Apoio Contínuo',
      items: [
        { title: 'Apoio Contínuo',           description: 'Durante e depois do curso.' },
        { title: 'Feedback Individual',      description: 'Toda semana sobre suas tarefas e entregas.' },
        { title: 'Suporte WhatsApp',         description: '6 meses de grupo fechado com materiais extras, avisos, dicas e networking.' },
        { title: 'Encontros Mensais',        description: 'Para tirar dúvidas e ajustar sua trajetória.' }
      ]
    },
    {
      title: 'Materiais Exclusivos',
      items: [
        { title: 'Materiais Exclusivos',     description: 'Para acelerar sua evolução.' },
        { title: 'Checklist de Prontidão',   description: 'Descubra se você já tem o perfil de coordenador.' },
        { title: 'Guia de Plugins',          description: 'Essenciais para Revit (curadoria focada em coordenação).' },
        { title: 'Template de BEP',          description: 'Completo: base ou inspiração.' },
        { title: 'Mini eBook',               description: 'Guia Rápido da Transição de Modelador para Coordenador.' },
        { title: 'Infográfico',              description: 'Caminho da Confiança — etapas de evolução prática.' },
        { title: 'Clash Tricks',             description: 'Mini eBook exclusivo: Clash Detection Tricks.' },
        { title: 'Áudios BIM',               description: 'Principais erros que cometi como BIM Coordinator e como evitá-los.' }
      ]
    },
    {
      title: 'Avaliação & Certificação',
      items: [
        { title: 'Avaliação Prática Contínua', description: 'Durante o curso.' },
        { title: 'Score Final',                 description: 'Baseado em desempenho real.' },
        { title: 'Diploma de Conclusão',        description: 'Com nota e destaque de habilidades técnicas desenvolvidas.' }
      ]
    }
  ],
  image: lateralImage,
  imageAlt: 'Stack de Valor: bônus e extras',
  closing: 'Esse curso não entrega só conteúdo. Ele te entrega evolução mensurável, com rastros, resultado e prontidão para o mercado.'
};*/
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}

/* Cards do stack */
.stack-card {
  transition: all 0.3s ease;
  border: none !important;
}

.stack-card:hover {
  transform: translateY(-2px);
}

.stack-card:not(.highlight-card):hover {
  background-color: #f8f9fa !important;
}

.highlight-card:hover {
  background-color: #1a1a1a !important;
}

.icon-container {
  min-width: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;
}

.content-container {
  flex: 1;
}
</style>