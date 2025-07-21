<template>
  <FadeInSection>
    <HeroRoadmap :content="heroContent" :themeKey="'orangeAccent'" :customTopPadding="'80px'">
      <template #logo>
        <div class="text-left ml-4 mb-12">
          <v-img src="@/assets/logoBlack.png" width="120"></v-img>
        </div>
      </template>
    </HeroRoadmap>
  </FadeInSection>

  <FadeInSection>
    <RoadmapConteudo :items="solucaoContent.items" :themeKey="'orangeAccent'" :title="solucaoContent.title" />
  </FadeInSection>

  <FadeInSection>
    <Sobre :title="sobreContent.title" :text="sobreContent.text" :image="sobreContent.image" :themeKey="'orangeAccent'" />
  </FadeInSection>
</template>

<script setup>
import HeaderBar from '@/components/ui/HeaderBar.vue'
import FadeInSection from '@/components/ui/animations/FadeInSection.vue'
import HeroRoadmap from '@/components/HeroRoadmap.vue'
import Contexto from '@/components/Contexto.vue'
import RoadmapConteudo from '@/components/RoadmapConteudo.vue'
import Cta from '@/components/Cta.vue'
import Sobre from '@/components/Sobre.vue'

const heroContent = {
  headline: {
    mobile: 'Descubra o passo a passo da carreira BIM na Irlanda 🇮🇪',
    desktop: 'Descubra o passo a passo da carreira BIM na Irlanda 🇮🇪'
  },
  subheadline: {
    mobile: 'Receba gratuitamente o guia prático para acelerar sua carreira, evitar erros comuns e conquistar oportunidades reais no universo BIM.',
    desktop: 'Receba gratuitamente o guia prático para acelerar sua carreira, evitar erros comuns e conquistar oportunidades reais no universo BIM.'
  },
  image: '/src/assets/roadmap.jpg',
  imageAlt: 'Roadmap BIM',
  cta: 'Quero meu Roadmap BIM',
}

const solucaoContent = {
  title: 'O que você vai receber no Roadmap BIMM Smart?',
  items: [
    {
      title: 'Visão clara das etapas para dominar o BIM',
      subtitle: 'Um mapa completo do zero ao avançado para você saber exatamente onde está e para onde ir'
    },
    {
      title: 'Checklist prático de implementação',
      subtitle: 'Ferramentas prontas para aplicar imediatamente no seu dia a dia e ver resultados rápidos'
    },
    {
      title: 'Principais erros que travam profissionais',
      subtitle: 'Identificação dos obstáculos mais comuns e estratégias comprovadas para superá-los'
    },
    {
      title: 'Competências valorizadas pelo mercado',
      subtitle: 'As ferramentas, habilidades e estratégias que realmente fazem diferença na sua carreira'
    },
    {
      title: 'Estratégias de posicionamento profissional',
      subtitle: 'Dicas práticas para se destacar e crescer rapidamente na área de BIM'
    },
    {
      title: 'Recursos para aceleração de aprendizado',
      subtitle: 'Referências, links e materiais selecionados para impulsionar sua evolução técnica'
    }
  ],
}

const sobreContent = {
  title: 'Sobre o BIMM Smart',
  text: 'O BIMM Smart nasceu para ajudar profissionais e empresas a adotarem o BIM de forma simples, prática e lucrativa. Nosso Roadmap é resultado de experiência real, consultorias e projetos que transformaram carreiras e negócios. Baixe o material, aplique as estratégias e faça parte da comunidade que está mudando o cenário da construção no Brasil.',
  image: '/src/assets/sobre.png',
}
</script>
