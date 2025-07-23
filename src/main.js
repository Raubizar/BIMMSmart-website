/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Utils
import { checkRequiredEnvVars } from '@/utils/env'

// Verificar variáveis de ambiente
if (import.meta.env.MODE === 'development') {
  const envVarsOk = checkRequiredEnvVars();
  if (!envVarsOk) {
    console.warn('⚠️ Algumas variáveis de ambiente estão faltando. Verifique o arquivo .env');
  } else {
    console.log('✅ Todas as variáveis de ambiente necessárias estão configuradas.');
  }
}

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
