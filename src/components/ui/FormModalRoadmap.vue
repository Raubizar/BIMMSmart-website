<template>
  <v-dialog 
    v-model="dialog" 
    max-width="600px" 
    persistent
    :scrim="false"
    class="glass-dialog"
  >
    <v-card>
      <v-card-title class="text-h5 pa-6 pb-1">
        Receba o Roadmap BIM Gratuitamente
      </v-card-title>
      
      <!-- Subtítulo com ícone -->
      <div class="px-6 pb-4">
        <div class="d-flex align-center justify-start">
          <v-icon color="grey-darken-1" size="16" class="me-2">mdi-file-document-outline</v-icon>
          <p class="text-body-1 text-grey-darken-1 font-weight-medium mb-0">
            Guia prático para acelerar sua carreira BIM
          </p>
        </div>
      </div>
      
      <v-card-text class="px-6 pb-6">
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="form.name"
            label="Nome completo"
            required
            variant="outlined"
            class="mb-4"
          />
          
          <v-text-field
            v-model="form.email"
            label="E-mail"
            required
            variant="outlined"
            class="mb-4"
          />
          
          <v-row class="mb-4">
            <v-col cols="4">
              <v-text-field
                v-model="form.countryCode"
                label="Código"
                required
                variant="outlined"
                value="+55"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="form.phone"
                label="WhatsApp"
                required
                variant="outlined"
                placeholder="(61) 99999-9999"
                maxlength="15"
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
          type="submit"
        >
          RECEBER ROADMAP
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'success', 'error'],
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        countryCode: '+55'
      },
      utmParams: {},
      loading: false
    }
  },
  computed: {
    dialog: {
      get() { return this.modelValue },
      set(value) { this.$emit('update:modelValue', value) }
    }
  },
  methods: {
    async submitForm() {
      this.loading = true
      
      try {
        const formData = new URLSearchParams()
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('phone', "'" + this.form.countryCode + ' ' + this.form.phone)
        formData.append('timestamp', new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'))
        formData.append('source', this.utmParams.utm_source || 'Direct')
        formData.append('medium', this.utmParams.utm_medium || '')
        formData.append('campaign', this.utmParams.utm_campaign || '')
        formData.append('content', this.utmParams.utm_content || '')
        formData.append('term', this.utmParams.utm_term || '')
        formData.append('tipo', 'Roadmap BIM')
        
        const response = await fetch('https://hook.eu2.make.com/jm5x0t2b098diless01vrc6pui8qeg8b', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-make-apikey': 'K-h5-i-b2MEKbtL'
          },
          body: formData
        })
        
        if (response.ok || response.status === 200) {
          this.$emit('success')
          this.closeModal()
          this.resetForm()
          this.$router.push('/obrigado-roadmap')
        } else {
          const errorText = await response.text()
          console.error('Erro do servidor:', errorText)
          alert(`Erro ao enviar: ${response.status}`)
        }
      } catch (err) {
        console.error('Erro de conexão:', err)
        alert('Erro de conexão.')
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.dialog = false
    },
    formatPhone(event) {
      let value = event.target.value.replace(/\D/g, '')
      
      // Limitar a 11 dígitos
      if (value.length > 11) {
        value = value.substring(0, 11)
      }
      
      // Aplicar máscara progressiva
      let formatted = ''
      
      if (value.length > 0) {
        formatted += '(' + value.substring(0, 2)
        if (value.length >= 2) {
          formatted += ') '
        }
        if (value.length > 2) {
          formatted += value.substring(2, 7)
        }
        if (value.length > 7) {
          formatted += '-' + value.substring(7, 11)
        }
      }
      
      this.form.phone = formatted
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        countryCode: '+55'
      }
    },
    captureUTMParams() {
      const urlParams = new URLSearchParams(window.location.search)
      this.utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term')
      }
    }
  },
  mounted() {
    this.captureUTMParams()
  }
}
</script>

<style scoped>
:deep(.glass-dialog .v-overlay__scrim) {
  background: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}

:deep(.v-dialog) {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>