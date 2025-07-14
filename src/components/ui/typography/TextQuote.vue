<template>
  <div
    :class="[
      classSize,
      'font-italic',
      colorClass,
      props.spacing,
      iconPosition === 'top' ? 'd-flex flex-column align-center' : 'd-flex align-center',
      'justify-start text-left'
    ]"
  >
    <v-icon
      v-if="props.icon"
      :class="[
        iconClass,
        iconPosition === 'top' ? 'mb-3' : 'me-3'
      ]"
      :size="props.iconSize"
    >{{ props.icon }}</v-icon>
    <span><slot /></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  // cor do texto da quote usando classes do tema
  colorClass: { type: String, default: '' },
  // espaçamento (ex: 'mb-4')
  spacing:    { type: String, default: '' },
  // ícone opcional
  icon:       { type: String, default: '' },
  // cor do ícone usando mesmo padrão dos outros elementos
  iconColor:  { type: String, default: 'tertiary' },
  // tamanho do ícone em px
  iconSize:   { type: [String, Number], default: 48 },
  // tamanho do texto da quote
  size:       { type: String, default: '' },
  // posição do ícone: 'top', 'left'
  iconPosition: { type: String, default: 'left' },
  // alinhamento do bloco: 'left', 'center'
  alignment: { type: String, default: 'left' }
})

const { mobile } = useDisplay()

// usa a classe de cor fornecida ou fallback
const colorClass = computed(() => {
  return props.colorClass || (mobile.value ? 'text-subtitle-1' : 'text-h6')
})

// decide a classe de cor do ícone usando mesmo padrão dos outros elementos
const iconClass = computed(() => {
  return props.iconColor
})

// posição do ícone
const iconPosition = computed(() => {
  return props.iconPosition
})

// decide a classe de tamanho do texto: usa props.size ou fallback responsivo
const classSize = computed(() => {
  if (props.size) {
    // permitir usar 'h5' ou 'text-h5'
    return props.size.startsWith('text-')
      ? props.size
      : `text-${props.size}`
  }
  return mobile.value ? 'text-subtitle-1' : 'text-h5'
})
</script>