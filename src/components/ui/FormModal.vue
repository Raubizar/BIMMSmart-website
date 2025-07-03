<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5 pa-6 pb-4">
        <v-icon class="me-3" color="grey-darken-3">mdi-school</v-icon>
        Pré-inscrição BIM Coordinator
      </v-card-title>
      
      <v-card-text class="px-6 pb-6">
        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="formData.name"
            label="Nome completo"
            :rules="nameRules"
            required
            variant="outlined"
            class="mb-4"
          />
          
          <v-text-field
            v-model="formData.email"
            label="E-mail"
            :rules="emailRules"
            required
            variant="outlined"
            class="mb-4"
          />
          
          <v-select
            v-model="formData.location"
            :items="locationOptions"
            label="Onde você está?"
            :rules="locationRules"
            required
            variant="outlined"
            class="mb-4"
            @update:modelValue="onLocationChange"
          />
          
          <v-row v-if="formData.location" class="mb-4">
            <v-col cols="4">
              <v-text-field
                v-model="formData.countryCode"
                label="Código"
                :rules="countryCodeRules"
                required
                variant="outlined"
                @input="ensurePlusPrefix"
                maxlength="5"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="formData.phone"
                label="WhatsApp"
                :rules="phoneRules"
                required
                variant="outlined"
                :maxlength="formData.countryCode === '+55' ? 15 : 20"
                @input="formatPhone"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn
          text
          @click="closeModal"
          :disabled="loading"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="grey-darken-3"
          variant="flat"
          @click="submitForm"
          :loading="loading"
          :disabled="!valid"
        >
          CONTINUAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  webhookUrl: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue', 'success', 'error'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref(null)
const valid = ref(false)
const loading = ref(false)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  countryCode: '+'
})

const locationOptions = [
  'Irlanda',
  'Brasil',
  'Portugal',
  'Reino Unido',
  'Alemanha',
  'França',
  'Espanha',
  'Outros'
]

const countryCodes = {
  'Irlanda': '+353',
  'Brasil': '+55',
  'Portugal': '+351',
  'Reino Unido': '+44',
  'Alemanha': '+49',
  'França': '+33',
  'Espanha': '+34',
  'Outros': ''
}

const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const emailRules = [
  v => !!v || 'E-mail é obrigatório',
  v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const phoneRules = computed(() => {
  if (formData.value.countryCode === '+55') {
    return [
      v => !!v || 'WhatsApp é obrigatório',
      v => v.replace(/\D/g, '').length === 11 || 'WhatsApp deve ter 11 dígitos (DDD + 9 dígitos)'
    ]
  }
  return [
    v => !!v || 'WhatsApp é obrigatório',
    v => v.length >= 8 || 'WhatsApp deve ter pelo menos 8 dígitos'
  ]
})

const locationRules = [
  v => !!v || 'Localização é obrigatória'
]

const countryCodeRules = [
  v => !!v || 'Código do país é obrigatório',
  v => v.startsWith('+') || 'Código deve começar com +'
]

function onLocationChange(location) {
  if (location && location !== 'Outros') {
    formData.value.countryCode = countryCodes[location]
  } else {
    formData.value.countryCode = '+'
  }
}

function ensurePlusPrefix(event) {
  let value = event.target.value
  if (!value.startsWith('+')) {
    formData.value.countryCode = '+' + value.replace(/\+/g, '')
  }
}

function formatPhone(event) {
  if (formData.value.countryCode === '+55') {
    let value = event.target.value.replace(/\D/g, '')
    
    if (value.length <= 11) {
      if (value.length >= 2) {
        value = value.replace(/(\d{2})/, '($1)')
      }
      if (value.length >= 8) {
        value = value.replace(/(\(\d{2}\))(\d{5})/, '$1 $2')
      }
      if (value.length >= 13) {
        value = value.replace(/(\(\d{2}\) \d{5})(\d{4})/, '$1-$2')
      }
      formData.value.phone = value
    }
  }
}

async function submitForm() {
  if (!valid.value) return
  
  loading.value = true
  
  try {
    const response = await fetch(props.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
        timestamp: new Date().toISOString(),
        source: 'BIM Coordinator Landing Page'
      })
    })
    
    if (response.ok) {
      emit('success')
      closeModal()
      resetForm()
      // Redirecionar para Google Forms
      window.open('https://forms.google.com', '_blank')
    } else {
      throw new Error('Erro no envio')
    }
  } catch (error) {
    emit('error', error)
  } finally {
    loading.value = false
  }
}

function closeModal() {
  dialog.value = false
}

function resetForm() {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    location: '',
    countryCode: '+'
  }
  form.value?.resetValidation()
}
</script>