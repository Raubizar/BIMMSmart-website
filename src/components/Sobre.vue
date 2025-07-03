<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-4' : 'px-16']"
  >
    <v-row class="d-flex" :class="mobile ? '' : 'align-center'">
      <!-- Text Column -->
      <v-col
        cols="12"
        md="6"
        :order="mobile ? 2 : 1"
        class="text-left"
      >
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
          spacing="mb-4"
        >
          {{ content.headline }}
        </TextHeadline>

        <TextParagraph
          v-for="(paragraph, index) in content.paragraphs"
          :key="index"
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-4"
          v-html="formatParagraph(paragraph)"
        />
      </v-col>

      <!-- Image Column -->
      <v-col
        cols="12"
        md="6"
        :order="mobile ? 1 : 2"
        class="text-center mb-6"
      >
        <v-img
          :src="content.image"
          :alt="content.imageAlt"
          max-width="500"
          rounded="lg"
          class="mx-auto"
          contain
        />
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

const { mobile } = useDisplay();
const props = defineProps({ themeKey: { type: String, default: 'lightPurple' } });
const theme = getThemeConfig(props.themeKey);
const content = cursoContent.sobre;

function formatParagraph(paragraph) {
  if (paragraph.includes('O CARA DO BIM')) {
    return paragraph.replace('"O CARA DO BIM"', '<span class="font-weight-bold">"O CARA DO BIM"</span>')
  }
  return paragraph
}
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}
</style>