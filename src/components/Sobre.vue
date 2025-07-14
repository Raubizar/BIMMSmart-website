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
          :size="index === 0 ? (mobile ? 'h6' : 'h5') : (mobile ? 'subtitle-1' : 'h6')"
          :spacing="index === 2 ? 'mb-0' : 'mb-4'"
          :class="[
            index === 2 ? 'highlighted-paragraph' : '',
            index === content.paragraphs.length - 1 ? 'last-paragraph' : ''
          ]"
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

:deep(.highlighted-paragraph) {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #424242;
  margin-bottom: 2rem;
}

:deep(.last-paragraph) {
  padding-top: 1.5rem;
}
</style>