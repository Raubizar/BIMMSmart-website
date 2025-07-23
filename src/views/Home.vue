<template>
  <!-- Header -->
  <HeaderBar 
    :themeKey="pageConfig.header.themeKey"
    :alertTitle="cursoContent.header.alertTitle"
    :alertSubtitle="cursoContent.header.alertSubtitle"
    :alertIcon="cursoContent.header.alertIcon"
    :showCountdown="cursoContent.header.showCountdown"
    v-if="pageConfig.header.show"
  />

  <!-- Hero -->
  <FadeInSection>
    <Hero
      :content="cursoContent.hero"
      :themeKey="pageConfig.hero.themeKey"
    />
  </FadeInSection>

  <!-- Blocos dinâmicos -->
  <template v-for="(block, index) in pageConfig.blocks" :key="block.type">
    <FadeInSection :delay="(index + 1) * pageConfig.animations.increment">
      <component 
        :is="getComponent(block.type)"
        :themeKey="block.themeKey"
        :webhookUrl="block.type === 'cta' ? WEBHOOK_URL : undefined"
      />
    </FadeInSection>
  </template>
</template>

<script setup>
import { createPageConfig } from '@/config/pageConfig'
import { cursoContent } from '@/content/cursoContent'
import HeaderBar from '@/components/ui/HeaderBar.vue'
import Hero from '@/components/Hero.vue'
import Empatia from '@/components/Empatia.vue'

import Contexto from '@/components/Contexto.vue'
import Solucao from '@/components/Solucao.vue'
import DiferencialHorizontal from '@/components/DiferencialHorizontal.vue'
import Stack from '@/components/Stack.vue'
import Objections from '@/components/Objections.vue'
import Garantia from '@/components/Garantia.vue'
import Urgencia from '@/components/Urgencia.vue'
import Cta from '@/components/Cta.vue'
import Sobre from '@/components/Sobre.vue'
import FadeInSection from '@/components/ui/animations/FadeInSection.vue'

// Webhook URL
const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL

// Configuração da página
const pageConfig = createPageConfig()

// Mapeamento de componentes
const componentMap = {
  empatia: Empatia,

  contexto: Contexto,
  solucao: Solucao,
  diferencial: DiferencialHorizontal,
  stack: Stack,
  objections: Objections,
  garantia: Garantia,
  urgencia: Urgencia,
  cta: Cta,
  sobre: Sobre
}

function getComponent(type) {
  return componentMap[type] || 'div'
}
</script>

<style scoped>
/* this area ("canvas") shows your Home.vue code */
</style>