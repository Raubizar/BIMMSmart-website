/**
 * Utilitário para verificar variáveis de ambiente
 */

/**
 * Verifica se as variáveis de ambiente necessárias estão definidas
 * @returns {boolean} - true se todas as variáveis estão definidas, false caso contrário
 */
export function checkRequiredEnvVars() {
  const requiredVars = [
    'VITE_MAKE_API_KEY',
    'VITE_MAKE_WEBHOOK_URL'
  ];
  
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Variáveis de ambiente ausentes: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
}

/**
 * Obtém uma variável de ambiente com fallback
 * @param {string} name - Nome da variável de ambiente
 * @param {string} fallback - Valor padrão caso a variável não esteja definida
 * @returns {string} - Valor da variável ou fallback
 */
export function getEnvVar(name, fallback = '') {
  return import.meta.env[name] || fallback;
}