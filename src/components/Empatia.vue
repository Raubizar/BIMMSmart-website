<template>
  <v-container
    fluid
    class="pa-0 pt-16 ma-0 pb-16"
    :class="[
      theme.isDark ? theme.backgroundColor + ' text-white' : theme.backgroundColor + ' text-dark',
      mobile ? 'pa-0' : 'px-16'
    ]"
  >
    <v-row class="px-0 mx-0 my-0 py-0">
      <!-- Headline & Context -->
      <v-col
        cols="12"
        md="6"
        :class="mobile ? 'px-10 pt-0' : 'px-16 pt-8'"
      >
        <TextHeadline
          :color="theme.headlineColor"
          :size="mobile ? 'h4' : 'h3'"
        >
          {{ content.headline }}
        </TextHeadline>
        <TextParagraph
          v-if="content.context"
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          class="pt-6"
        >
          {{ content.context }}
        </TextParagraph>
        
        <v-img
          src="/src/assets/gantt.jpg"
          alt="Gantt Chart"
          class="mt-6"
          contain
        />
      </v-col>

      <!-- Cards -->
      <v-col
        cols="12"
        md="6"
        :order="mobile ? 1 : 0"
        class="px-6"
      >
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          class="pb-3 text-uppercase"
        >
          Você passa frequentemente por alguma dessas dificuldades?
        </TextParagraph>

        <v-row
          class="pt-4 d-flex justify-center"
          :class="mobile ? '' : 'px-2'"
        >
          <v-col
            v-for="(item, index) in content.painPoints"
            :key="index"
            cols="12"
            md="6"
          >
            <CardItem
              :item="item"
              :theme="theme"
            />
          </v-col>
        </v-row>

      </v-col>
    </v-row>

    <!-- Quote em linha única abaixo do conteúdo -->
    <v-row class="pt-10">
      <v-col cols="12" class="text-center" :class="mobile ? 'px-6' : ''">
        <TextQuote
          v-if="content.quote"
          :colorClass="theme.quoteColor"
          icon="mdi-format-quote-close"
          iconColor="tertiary"
          :iconSize="48"
          alignment="left"
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
import CardItem from '@/components/ui/cards/CardItem.vue';

const props = defineProps({ themeKey: { type: String, default: 'creamHighlight' } });
const theme = getThemeConfig(props.themeKey);
const { mobile } = useDisplay();

const content = cursoContent.empatia;
</script>

<style scoped>
.v-container { padding-bottom: 4rem; }
</style>