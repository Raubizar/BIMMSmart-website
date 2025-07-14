<template>
  <v-row class="pt-4 pb-16 justify-center px-4">
    <v-col cols="12" md="9" class="pb-8">
      <!-- Headline -->
      <TextHeadline
        :color="theme.headlineColor"
        :size="mobile ? 'h5' : 'h4'"
        spacing="mb-4"
        class="text-center"
      >
        {{ content.heading }}
      </TextHeadline>

      <!-- Lead Capture Form -->
      <form @submit.prevent="onSubmit">
        <v-text-field
          v-model.trim="form.firstname"
          :label="content.labels.firstname"
          prepend-icon="mdi-account-circle"
          outlined
          class="mt-4"
          required
        />

        <v-text-field
          v-model.trim="form.phone"
          :label="content.labels.phone"
          prepend-icon="mdi-whatsapp"
          outlined
          class="mt-4"
          required
        />

        <v-text-field
          v-model.trim="form.email"
          :label="content.labels.email"
          prepend-icon="mdi-email"
          outlined
          class="mt-4"
          required
        />

        <v-btn
          :loading="submitting"
          block
          :color="theme.buttonColor"
          rounded="lg"
          height="64"
          type="submit"
        >
          {{ content.buttonText }}
        </v-btn>
      </form>

      <!-- Note -->
      <p
        class="text-h6 font-weight-regular text-center mt-2"
        style="line-height: 1.2;"
      >
        {{ content.notePrefix }} {{ threeDaysFromNow }}.
      </p>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import moment from 'moment';
import { getThemeConfig } from '@/helpers/blockThemes';
import TextHeadline from '@/components/ui/typography/TextHeadline.vue';

// Props: provide webhook URL and optional themeKey
const props = defineProps({
  webhookUrl: { type: String, required: true },
  themeKey: { type: String, default: 'lightPurple' }
});

const { mobile } = useDisplay();
const theme = getThemeConfig(props.themeKey);

// Form state
const form = ref({ firstname: '', phone: '', email: '' });
const submitting = ref(false);

// Compute note date
const threeDaysFromNow = computed(() => moment().add(3, 'days').format('DD/MM/YYYY'));

// Static copy
const content = {
  heading: 'Quer fazer parte desta turma?',
  labels: {
    firstname: 'Seu Primeiro Nome',
    phone: 'Seu WhatsApp',
    email: 'Seu E-mail'
  },
  buttonText: 'Prosseguir',
  notePrefix: 'Inscrições encerram em'
};

// Submission handler, posts to Make webhook
async function onSubmit() {
  if (submitting.value) return;
  submitting.value = true;
  
  try {
    const response = await fetch(props.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: form.value.firstname,
        phone: form.value.phone,
        email: form.value.email,
        timestamp: new Date().toISOString(),
        source: 'bim-pv-curso'
      })
    });
    
    if (response.ok) {
      // Limpar formulário após sucesso
      form.value = { firstname: '', phone: '', email: '' };
      // Opcional: mostrar mensagem de sucesso
      console.log('Lead enviado com sucesso!');
    } else {
      throw new Error('Erro na resposta do servidor');
    }
  } catch (err) {
    console.error('Erro ao enviar formulário:', err);
    // Opcional: mostrar mensagem de erro para o usuário
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.v-row {
  max-width: 100%;
}
</style>