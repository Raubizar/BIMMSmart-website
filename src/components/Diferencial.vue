<template>
  <v-container
    fluid
    class="pa-0 ma-0 pb-16"
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
          {{ diferencialContent.headline }}
        </TextHeadline>
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ diferencialContent.intro }}
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
          {{ diferencialContent.subtitle }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 3: Cards Grid -->
    <v-row class="d-flex justify-center" :class="mobile ? '' : 'px-4'">
      <v-col
        v-for="(item, idx) in diferencialContent.items"
        :key="idx"
        cols="12"
        md="3"
        class="mb-4 text-left"
      >
        <CardItem :item="item" :theme="theme" />
      </v-col>
    </v-row>

    <!-- Zone 4: Benefits Paragraph -->
    <v-row>
      <v-col cols="12">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ diferencialContent.benefits }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 5: Simulator Analogy -->
    <v-row>
      <v-col cols="12">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ diferencialContent.analogy }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 6: Quote Final -->
    <v-row>
      <v-col cols="12" md="8" class="mx-auto text-center">
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-format-quote-close"
          iconColor="tertiary"
          :iconSize="48"
        >
          {{ diferencialContent.quote }}
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
import CardItem from '@/components/ui/cards/CardItem.vue';

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'darkPurple' } });
const theme = getThemeConfig(props.themeKey);

const diferencialContent = cursoContent.diferencial;
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem !important;
}
</style>