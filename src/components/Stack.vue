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
          size="h4"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          size="h5"
          spacing="mb-8"
        >
          {{ content.subIntro }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 2: Accordion & Image -->
    <v-row class="d-flex" :class="mobile ? '' : 'align-start'">
      <!-- Accordion Column -->
      <v-col
        cols="12"
      >
        <div
          v-for="(stack, sidx) in content.stacks"
          :key="sidx"
          class="mb-8"
        >
          <TextHeadline
            :color="theme.headlineColor"
            size="h6"
            spacing="mb-2"
          >
            {{ stack.title }}
          </TextHeadline>

          <Accordion
            :themeKey="props.themeKey"
            :items="stack.items"
          />
        </div>
      </v-col>


    </v-row>

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
.sticky-image {
  position: sticky;
  top: 48px;
}
@media (max-width: 960px) {
  .sticky-image {
    position: static;
  }
}
</style>