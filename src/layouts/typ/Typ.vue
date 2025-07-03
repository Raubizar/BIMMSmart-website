<template>
  <v-app class="bg-veryLight">
    <v-container fluid class="pt-16 bg-veryLight">
      <v-row class="justify-center align-end">
        <v-col cols="11" md="6" class="pb-16" :class="mobile ? 'px-6' : 'pl-16 pr-0'">
          <v-img
            src="@/assets/logoBlack.png"
            :width="mobile ? '180' : '250'"
          />
          <p class="pt-12 font-weight-medium text-secondary" :class="mobile ? 'text-h5' : 'text-h4'">
            Oi <b class="text-accent text-primary">{{ firstName }}</b>, agradeço seu contato!
          </p>
          <div :class="mobile ? 'pb-0' : 'pb-16'">
            <!-- <p class="pt-1 font-weight-black" :class="mobile ? 'text-h3' : 'text-h2'">
              <span class="text-primary">Falta pouco, <b class="text-accent">{{ firstName }}</b>!</span>
            </p> -->
            <p class="pt-7 font-weight-regular text-primary" :class="mobile ? 'text-h5' : 'text-h4'">
              <v-icon color="tertiary" size="42">mdi-whatsapp</v-icon> Já estamos entrando em contato com seu WhatsApp para envio da <b>Proposta do Programa de Mentoria</b>, ok? 
            </p>
            <v-card rounded="lg" color="quartiary" variant="flat" class="mt-7 pa-3 text-body-2 text-uppercase text-veryDark font-weight-medium">
              <v-icon color="tertiary" size="21" class="mr-1">mdi-alert</v-icon>Estamos encerrando as inscrições para a 1ª Turma de 2025!
            </v-card>
            <p class="pt-3 font-weight-regular text-primary" :class="mobile ? 'text-h5' : 'text-h6'">
              Você está recebendo <span class="font-weight-bold">condições especiais que só são válidas por 72 horas</span> a partir de agora.
            </p>
            <!-- <p class="pt-6 font-weight-regular text-primary" :class="mobile ? 'text-h5' : 'text-h4'">
              Agora simmmmm! É só ir lá no seu e-mail e aproveitar o <b class="text-accent font-weight-black">Mapa do Sucesso</b> 🙌
            </p> -->
            <p class="pt-4 text-secondary">
              Veja com carinho. Preparamos o Programa de Mentoria com <span class="text-accent">🩷</span> especialmente para você!
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pb-0 pl-0">
          <v-img class="justify-end" :src="imgTyp" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import imgTyp from '@/assets/typ.png';
import { ref } from 'vue';

const { mobile } = useDisplay();
const route = useRoute();
const firstName = ref(route.query.nome || '');

</script>