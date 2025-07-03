<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-48 pb-48"
    style="margin-top: 6rem; margin-bottom: 6rem; padding-top: 6rem; padding-bottom: 6rem;"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <v-row class="d-flex" :class="mobile ? '' : 'align-start'">
      <!-- Image Column (left on desktop, full-width on mobile) -->
      <v-col
        cols="12"
        md="4"
        :order="mobile ? 1 : 1"
        class="text-center mb-6"
      >
        <v-img
          :src="content.image"
          :alt="content.imageAlt"
          max-width="240"
          contain
          class="mx-auto"
        />
      </v-col>

      <!-- Text Column -->
      <v-col
        cols="12"
        md="8"
        :order="mobile ? 2 : 2"
      >
        <!-- Headline -->
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>
        
        <!-- Descriptions -->
        <TextParagraph
          v-for="(line, i) in content.description"
          :key="i"
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          :class="i > 0 ? 'pt-2' : ''"
        >
          {{ line }}
        </TextParagraph>

        <!-- Key Points (if any) -->
        <ul v-if="content.points.length" style="list-style:none; padding-left:0;" class="pt-4">
          <TextListItem
            v-for="(item, idx) in content.points"
            :key="idx"
            :colorClass="theme.paragraphColor"
            :size="mobile ? 'subtitle-1' : 'h6'"
            spacing="mb-2"
          >
            {{ item }}
          </TextListItem>
        </ul>

        <!-- Guarantee Quote -->
        <TextQuote
          class="pt-6"
          :colorClass="theme.quoteColor"
          icon="mdi-shield-check"
          iconColor="secondary"
          :iconSize="48"
          spacing="mt-4"
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
import TextListItem from '@/components/ui/typography/TextListItem.vue';
import TextQuote from '@/components/ui/typography/TextQuote.vue';
import guaranteeImage from '@/assets/garantia.png';

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'lightPurple' } });
const theme = getThemeConfig(props.themeKey);

const content = {
  ...cursoContent.garantia,
  image: guaranteeImage
};

/*const oldContent = {
  headline: 'Garantia total: ou faz sentido pra você, ou seu dinheiro volta',
  description: [
    'Em até 7 dias após o treinamento, se perceber que não faz sentido para você, não precisa justificar nada. É só pedir o reembolso.',
    'Sem burocracia. Sem perguntas. Sem pegadinhas.'
  ],
  points: [],
  quote: '“Ou esse curso vira uma virada concreta na sua carreira — ou você recebe seu dinheiro de volta.”',
  image: guaranteeImage,
  imageAlt: 'Garantia de reembolso'
};*/
</script>

<style scoped>
.v-container {
  padding-top: 8rem !important;
  padding-bottom: 8rem !important;
  margin-top: 4rem !important;
  margin-bottom: 4rem !important;
}
</style>