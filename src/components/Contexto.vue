<template>
  <v-container
    fluid
    class="py-0 my-0 mx-0 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline & Intro -->
    <v-row class="d-flex" :class="mobile ? 'pt-0' : 'pt-16 align-start'">
      <v-col cols="12" md="6">
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ contextoContent.headline }}
        </TextHeadline>
        <TextParagraph
          v-for="(p, i) in contextoContent.paragraphs"
          :key="i"
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          :class="i === 0 ? 'mb-4' : 'pt-2'"
        >
          {{ p }}
        </TextParagraph>
      </v-col>
      <!-- Graphic on right for desktop -->
      <v-col cols="12" md="6" class="text-center">
        <v-img
          :src="contextoContent.illustration"
          :alt="contextoContent.illustrationAlt"
          width="100%"
          contain
        />
      </v-col>
    </v-row>

    <!-- Zone 2: Reforço full-width -->
    <v-row class="pt-8">
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ contextoContent.reforcoText }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 3: Cards Grid (4 per row desktop, stacked mobile) -->
    <v-row class="d-flex justify-center" :class="mobile ? '' : 'px-4'">
      <v-col
        v-for="(item, idx) in contextoContent.bullets"
        :key="idx"
        cols="12"
        md="3"
        class="mb-4 text-left"
      >
        <CardItem :item="item" :theme="theme" />
      </v-col>
    </v-row>

    <!-- Zone 4: Quote final (6 cols centered desktop) -->
    <v-row class="pt-8">
      <v-col cols="12" md="6" class="mx-auto text-center">
        <TextQuote
          :colorClass="theme.quoteColor"
          icon="mdi-format-quote-close"
          iconColor="tertiary"
          :iconSize="48"
        >
          {{ contextoContent.quote }}
        </TextQuote>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import TextQuote from '@/components/ui/typography/TextQuote.vue';
import CardItem from '@/components/ui/cards/CardItem.vue';
import { getThemeConfig } from '@/helpers/blockThemes';
import ilustracao from '@/assets/ilustracao-simbolica.png';

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'lightPurple' } });
const theme = getThemeConfig(props.themeKey);

const contextoContent = {
  ...cursoContent.contexto,
  illustration: ilustracao
};

const reforcoText = contextoContent.reforcoText;
</script>

<style scoped>
.v-img {
  height: auto;
}
</style>