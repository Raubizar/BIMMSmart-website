<template>
  <v-container fluid class="pa-0 ma-0 min-height-screen d-flex align-center justify-center" style="background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);">
    <v-card class="pa-8 text-center" max-width="600" elevation="8" rounded="lg" color="white">
      <v-img
        :src="rubensImage"
        alt="Rubens - BIM Coordinator"
        width="120"
        height="120"
        class="mx-auto mb-6 rounded-circle"
        style="border: 4px solid #e0e0e0;"
        cover
      />
      
      <h1 class="text-h3 font-weight-bold mb-4 text-grey-darken-4">
        Obrigado!
      </h1>
      
      <p class="text-h6 mb-6 text-grey-darken-2">
        Sua candidatura foi recebida com sucesso
      </p>
      
      <div class="text-body-1 mb-6 text-grey-darken-3">
        <p class="mb-4">Olá! Sou o Rubens e quero agradecer pelo seu interesse no curso BIM Coordinator.</p>
      </div>
      
      <v-card class="pa-4 mb-6" color="grey-lighten-4" flat>
        <v-icon color="grey-darken-2" size="32" class="mb-2">mdi-email-check</v-icon>
        <p class="text-h6 font-weight-bold mb-2 text-grey-darken-4">Próximos passos</p>
        <p class="text-body-2 text-grey-darken-3 mb-2">
          Em breve você receberá um e-mail com a resposta da avaliação da sua candidatura para participar do curso.
        </p>
        <p class="text-body-2 font-weight-medium text-grey-darken-4">
          Fique atento à sua caixa de entrada!
        </p>
      </v-card>
      
      <v-btn
        @click="goHome"
        color="grey-darken-3"
        variant="flat"
        size="large"
        rounded="lg"
        class="px-8"
      >
        Voltar ao Site
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import rubensImage from '@/assets/sobre.jpg'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.min-height-screen {
  min-height: 100vh;
}

.rounded-circle {
  border-radius: 50% !important;
}
</style>