<template>
  <v-container
    fluid
    class="pa-0 ma-0 pt-16 pb-16"
    :class="[theme.backgroundColor, mobile ? 'px-6' : 'px-16']"
  >
    <!-- Zone 1: Headline & Subheadline -->
    <v-row :class="mobile ? 'pt-0' : 'pt-16'">
      <v-col cols="12" class="text-center">
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
          {{ content.subHeadline }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 2: Qualifiers List -->
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
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

    <!-- Zone 3: Emphasis -->
    <v-row class="pt-8">
      <v-col cols="12" class="text-center">
        <TextParagraph
          :color="theme.paragraphColor"
          :size="mobile ? 'subtitle-1' : 'h6'"
          spacing="mb-6"
        >
          {{ content.emphasis }}
        </TextParagraph>
      </v-col>
    </v-row>

    <!-- Zone 4: Call to Action Button -->
    <v-row>
      <v-col cols="12" md="6" class="mx-auto text-center">
        <v-btn
          @click="openModal"
          block
          :color="theme.buttonColor"
          rounded="lg"
          height="64"
        >
          <span class="text-h5 font-weight-bold text-uppercase">
            {{ content.ctaText }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Form Modal -->
  <FormModal
    v-model="showModal"
    :webhookUrl="webhookUrl"
    @success="onFormSuccess"
    @error="onFormError"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { getThemeConfig } from '@/helpers/blockThemes';
import { cursoContent } from '@/content/cursoContent';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';
import TextParagraph from '@/components/ui/typography/TextParagraph.vue';
import TextListItem from '@/components/ui/typography/TextListItem.vue';
import FormModal from '@/components/ui/FormModal.vue';

const props = defineProps({
  themeKey: { type: String, default: 'darkPurple' },
  webhookUrl: { type: String, required: true }
});

const emit = defineEmits(['openModal']);
const { mobile } = useDisplay();
const theme = getThemeConfig(props.themeKey);

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function onFormSuccess() {
  console.log('Formulário enviado com sucesso!')
}

function onFormError(error) {
  console.error('Erro no envio:', error)
}

const content = cursoContent.cta;
</script>

<style scoped>
.v-container {
  padding-bottom: 4rem;
}
</style>