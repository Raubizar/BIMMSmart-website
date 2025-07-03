<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline -->
    <v-row :class="mobile ? 'pt-0' : 'pt-16'">
      <v-col cols="12" class="text-center">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>
      </v-col>
    </v-row>

    <!-- Zone 2: Intro & Truth Quote -->
    <v-row>
      <v-col cols="12">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-4"
        >
          {{ content.intro }}
        </TextParagraph>
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-information-outline"
          iconColor="secondary"
          :iconSize="48"
          spacing="mb-6"
        >
          {{ content.truthQuote }}
        </TextQuote>
      </v-col>
    </v-row>

    <!-- Zone 3: Qualifiers List -->
    <v-row>
      <v-col cols="12" md="6" :class="mobile ? '' : 'pe-8'">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h6' : 'h5'"
          spacing="mb-4"
        >
          {{ content.qualifiersHeadline }}
        </TextHeadline>
        <ul style="list-style:none; padding-left:0;">
          <TextListItem
            v-for="(item, i) in content.qualifiers"
            :key="i"
            :colorClass="theme.paragraphColor"
            :size="mobile ? 'subtitle-1' : 'h6'"
            spacing="mb-2"
          >
            {{ item }}
          </TextListItem>
        </ul>
      </v-col>
    </v-row>

    <!-- Zone 4: Reinforcement -->
    <v-row>
      <v-col cols="12">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.reinforcement }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 5: Final Quote -->
    <v-row>
      <v-col cols="12">  
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-check-circle-outline"
          iconColor="primary"
          :iconSize="48"
        >
          {{ content.finalQuote }}
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

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'creamHighlight' } });
const theme = getThemeConfig(props.themeKey);

const content = cursoContent.objections;

/*const content = {
  headline: '“E se eu não estiver pronto para esse upgrade na carreira?”',
  intro: 'Essa é uma dúvida comum.',
  truthQuote: 'Você não precisa estar pronto. Esse treinamento existe exatamente porque você ainda não viveu a coordenação na prática.',
  qualifiersHeadline: 'Se você:',
  qualifiers: [
    'Já trabalha com BIM (na Irlanda ou no Brasil)',
    'Atua com modelagem, mas quer mais responsabilidade, valorização e reconhecimento',
    'Quer se sentir seguro para aplicar para cargos melhores'
  ],
  reinforcement: 'Não saber tudo ainda não é um problema. O que conta aqui é a sua disposição para entrar no jogo, treinar de verdade e sair com mais preparo do que muita gente que já está coordenando por aí.',
  finalQuote: 'Você não vai ser jogado no escuro. Vai ter apoio, correção, acompanhamento — e a liberdade de errar enquanto aprende.'
};*/
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}
</style>