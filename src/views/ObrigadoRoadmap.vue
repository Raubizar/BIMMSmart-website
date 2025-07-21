<template>
  <v-container fluid class="pa-0 ma-0 pb-16 min-height-screen d-flex align-center justify-center" style="background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);">
    <v-card class="pa-8 text-center" max-width="600" elevation="8" rounded="lg" color="white">
      <v-img
        src="@/assets/logoBlack.png"
        alt="BIMM Smart"
        width="120"
        class="mx-auto mb-6"
      />
      
      <h1 class="text-h3 font-weight-bold mb-4 text-grey-darken-4">
        Obrigado!
      </h1>
      
      <p class="text-h6 mb-6 text-grey-darken-2">
        Aproveite o passo a passo para se tornar um BIM Coordinator na Irlanda
      </p>
      
      <div class="text-body-1 mb-6 text-grey-darken-3">
        <p class="mb-4">Seu guia completo para acelerar sua carreira BIM internacional está pronto para ser explorado.</p>
      </div>
      
      <v-card class="pa-4 mb-6" color="grey-lighten-4" flat>
        <v-icon color="#fe5f04" size="32" class="mb-2">mdi-map</v-icon>
        <p class="text-h6 font-weight-bold mb-2 text-grey-darken-4">Dica especial</p>
        <p class="text-body-2 text-grey-darken-3 mb-2">
          Na última página do Roadmap, você encontrará um convite especial para preencher um Quiz.
        </p>
        <p class="text-body-2 font-weight-medium text-grey-darken-4">
          Ao completá-lo, você receberá um feedback personalizado sobre sua jornada BIM!
        </p>
      </v-card>
      
      <div class="text-center">
        <v-btn
          @click="openRoadmap"
          color="#fe5f04"
          variant="flat"
          size="large"
          rounded="lg"
          class="px-8 hero-modern-btn mx-auto"
        >
          ABRIR ROADMAP
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function openRoadmap() {
  // Abrir o arquivo PDF do Roadmap em uma nova aba
  window.open('/assets/pdf/roadmap-bim.pdf', '_blank')
}
</script>

<style scoped>
/* Botão BIM - Laranja e quadrado */
.hero-modern-btn {
  background: linear-gradient(135deg, #fe5f04 0%, #e54e00 100%) !important;
  border: 2px solid #fe5f04 !important;
  color: white !important;
  position: relative;
  overflow: visible;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 8px 32px rgba(254, 95, 4, 0.4) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.hero-modern-btn:hover {
  background: linear-gradient(135deg, #e54e00 0%, #fe5f04 100%) !important;
  border-color: #e54e00 !important;
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 16px 48px rgba(254, 95, 4, 0.6), 0 0 40px rgba(254, 95, 4, 0.3) !important;
}
</style>

<style scoped>
.min-height-screen {
  min-height: 100vh;
}
</style>