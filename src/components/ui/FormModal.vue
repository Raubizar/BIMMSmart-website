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
        Pré-Inscrição para o Curso BIM Coordinator
      </v-card-title>
      
      <!-- Subtítulo com ícone -->
      <div class="px-6 pb-4">
        <div class="d-flex align-center justify-start">
          <v-icon color="grey-darken-1" size="16" class="me-2">mdi-clock-fast</v-icon>
          <p class="text-body-1 text-grey-darken-1 font-weight-medium mb-0">
            Turma com apenas 6 vagas
          </p>
        </div>
      </div>
      
      <v-card-text class="px-6 pb-6">
        <!-- Aviso sobre processo seletivo -->
        <div class="d-flex align-start mb-6 pa-3" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
          <v-icon color="warning" size="20" class="me-3 mt-1">mdi-information</v-icon>
          <div>
            <p class="text-body-2 mb-1 font-weight-medium" style="color: #856404;">Processo Seletivo</p>
            <p class="text-body-2 mb-0" style="color: #856404;">
              Esta é uma pré-inscrição. Sua candidatura será analisada e você receberá confirmação por e-mail sobre a aprovação.
            </p>
          </div>
        </div>
        

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
          
          <v-select
            v-model="form.location"
            :items="locationOptions"
            label="Onde você está?"
            required
            variant="outlined"
            class="mb-4"
            @update:modelValue="onLocationChange"
          />
          
          <v-row v-if="form.location" class="mb-4">
            <v-col cols="4">
              <v-text-field
                v-model="form.countryCode"
                label="Código"
                required
                variant="outlined"
                :readonly="form.location !== 'Outros'"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="form.phone"
                label="WhatsApp"
                required
                variant="outlined"
                :placeholder="form.countryCode === '+55' ? '(61) 99999-9999' : 'Digite seu telefone'"
                :maxlength="form.countryCode === '+55' ? 15 : 20"
                @input="formatPhone"
              />
            </v-col>
          </v-row>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Você é BIM Modeler?</p>
            <v-radio-group v-model="form.bimModeler" inline>
              <v-radio
                v-for="option in bimModelerOptions"
                :key="option"
                :label="option"
                :value="option"
              />
            </v-radio-group>
          </div>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Grau de familiaridade com Revit</p>
            <v-radio-group v-model="form.revitFamiliarity" inline>
              <v-radio
                v-for="option in familiarityOptions"
                :key="option"
                :label="option"
                :value="option"
              />
            </v-radio-group>
          </div>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Tem acesso ao Revit?</p>
            <v-switch
              v-model="form.revitAccess"
              :label="form.revitAccess ? 'Sim' : 'Não'"
              true-value="Sim"
              false-value="Não"
              color="primary"
              inset
            />
          </div>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Grau de familiaridade com Navisworks</p>
            <v-radio-group v-model="form.navisworksFamiliarity" inline>
              <v-radio
                v-for="option in familiarityOptions"
                :key="option"
                :label="option"
                :value="option"
              />
            </v-radio-group>
          </div>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Tem acesso ao Navisworks?</p>
            <v-switch
              v-model="form.navisworksAccess"
              :label="form.navisworksAccess ? 'Sim' : 'Não'"
              true-value="Sim"
              false-value="Não"
              color="primary"
              inset
            />
          </div>
          
          <div class="mb-4">
            <p class="text-h6 mb-3 font-weight-medium">Tem acesso ao Google Drive?</p>
            <v-switch
              v-model="form.googleDriveAccess"
              :label="form.googleDriveAccess ? 'Sim' : 'Não'"
              true-value="Sim"
              false-value="Não"
              color="primary"
              inset
            />
          </div>
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
          CONTINUAR
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
        location: '',
        countryCode: '',
        bimModeler: '',
        revitFamiliarity: '',
        revitAccess: '',
        navisworksFamiliarity: '',
        navisworksAccess: '',
        googleDriveAccess: ''
      },
      utmParams: {},
      loading: false,
      locationOptions: [
        'Brasil',
        'Portugal', 
        'Irlanda',
        'Reino Unido',
        'Alemanha',
        'França',
        'Espanha',
        'Outros'
      ],
      countryCodes: {
        'Brasil': '+55',
        'Portugal': '+351',
        'Irlanda': '+353', 
        'Reino Unido': '+44',
        'Alemanha': '+49',
        'França': '+33',
        'Espanha': '+34',
        'Outros': '+'
      },
      bimModelerOptions: [
        'Sim',
        'Não',
        'Já foi',
        'Está se preparando para ser'
      ],
      familiarityOptions: [
        'Iniciante',
        'Intermediário',
        'Avançado',
        'Nenhuma'
      ],
      accessOptions: [
        'Sim',
        'Não'
      ]
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
      
      const payload = {
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        timestamp: new Date().toISOString(),
        source: 'BIM PV Curso'
      }
      
      console.log('Enviando dados:', payload)
      
      try {
        const formData = new URLSearchParams()
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('phone', "'" + this.form.countryCode + ' ' + this.form.phone)
        formData.append('location', this.form.location)
        formData.append('bimModeler', this.form.bimModeler)
        formData.append('revitFamiliarity', this.form.revitFamiliarity)
        formData.append('revitAccess', this.form.revitAccess)
        formData.append('navisworksFamiliarity', this.form.navisworksFamiliarity)
        formData.append('navisworksAccess', this.form.navisworksAccess)
        formData.append('googleDriveAccess', this.form.googleDriveAccess)
        formData.append('timestamp', new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'))
        formData.append('source', this.utmParams.utm_source || 'Direct')
        formData.append('medium', this.utmParams.utm_medium || '')
        formData.append('campaign', this.utmParams.utm_campaign || '')
        formData.append('content', this.utmParams.utm_content || '')
        formData.append('term', this.utmParams.utm_term || '')
        formData.append('curso', 'BIM PV Curso 1')
        formData.append('turma', 'Turma T1-2025')
        
        const response = await fetch('https://hook.eu2.make.com/jm5x0t2b098diless01vrc6pui8qeg8b', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-make-apikey': 'K-h5-i-b2MEKbtL'
          },
          body: formData
        })
        
        console.log('Response status:', response.status)
        
        if (response.ok || response.status === 200) {
          this.$emit('success')
          this.closeModal()
          this.resetForm()
          this.$router.push('/obrigado')
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
    onLocationChange(location) {
      if (location && location !== 'Outros') {
        this.form.countryCode = this.countryCodes[location]
      } else {
        this.form.countryCode = '+'
      }
      // Resetar telefone ao mudar país
      this.form.phone = ''
    },
    setInitialMask() {
      // Não fazer nada no focus
    },
    formatPhone(event) {
      if (this.form.countryCode === '+55') {
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
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        location: '',
        countryCode: '',
        bimModeler: '',
        revitFamiliarity: '',
        revitAccess: '',
        navisworksFamiliarity: '',
        navisworksAccess: '',
        googleDriveAccess: ''
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