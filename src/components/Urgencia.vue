<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline & Intro -->
    <v-row class="d-flex" :class="mobile ? 'pt-0' : 'pt-16 align-start'">
      <!-- Text Column -->
      <v-col cols="12" md="6" :order="mobile ? 2 : 1">
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
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.subIntro }}
        </TextParagraph>
        <ul style="list-style: none; padding-left: 0;">
          <li v-for="(point, i) in content.points" :key="i" class="d-flex align-start mb-3">
            <v-icon :color="theme.headlineColor" size="24" class="me-3 mt-1">{{ point.icon }}</v-icon>
            <TextParagraph
              :color="theme.paragraphColor"
              :size="mobile ? 'subtitle-1' : 'h6'"
              spacing="mb-0"
            >
              {{ point.text }}
            </TextParagraph>
          </li>
        </ul>
      </v-col>

      <!-- Image Column -->
      <v-col
        cols="12"
        md="6"
        :order="mobile ? 1 : 2"
        :class="['text-center', mdAndUp ? 'sticky-image' : '']"
      >
        <v-img
          :src="content.image"
          :alt="content.imageAlt"
          width="100%"
          contain
        />
      </v-col>
    </v-row>

    <!-- Zone 2: Final Quote -->
    <v-row class="pt-8">
      <v-col cols="12" class="text-center">
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-clock-alert-outline"
          iconColor="primary"
          :iconSize="48"
        >
          {{ content.quote }}
        </TextQuote>
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
import TextQuote from '@/components/ui/typography/TextQuote.vue';
import TextListItem from '@/components/ui/typography/TextListItem.vue';
import urgencyImage from '@/assets/curso.jpg';

const { mobile, mdAndUp } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'darkPurple' } });
const theme = getThemeConfig(props.themeKey);

const content = {
  ...cursoContent.urgencia,
  image: urgencyImage
};

/*const oldContent = {
  headline: 'Urgência e Escassez: por que agora',
  intro: 'Essa oportunidade só acontece - no máximo - uma vez por ano.',
  subIntro: 'Este é um curso ao vivo, com feedback individual, simulação prática e acompanhamento próximo. Isso significa que não dá para abrir turmas o tempo todo — nem aceitar muitas pessoas de uma vez. Por isso:',
  points: [
    'As vagas presenciais são extremamente limitadas',
    'O grupo de WhatsApp é exclusivo para essa turma',
    'Acesso ao Rubens como “cliente real” só nessa edição',
    'Bônus extras e correção individual podem não estar disponíveis nas próximas turmas',
    'Talvez essa seja a única turma do ano'
  ],
  image: urgencyImage,
  imageAlt: 'Urgência e Escassez',
  quote: 'Esperar pode custar caro — não só no preço do curso, mas nas oportunidades que você vai continuar deixando passar.'
};*/
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}
.sticky-image {
  position: sticky;
  top: 16px;
}
@media (max-width: 960px) {
  .sticky-image {
    position: static;
  }
}
</style>