// src/helpers/blockThemes.js

/**
 * Paleta moderna BIM - Branco, Preto e Cinzas Estratégicos
 * Design profissional e minimalista
 */
export const blockThemes = {
  // Branco puro - Clareza e profissionalismo
  modernWhite: {
    isDark: false,
    backgroundColor: 'bg-white',
    backgroundStyle: { background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)' },
    headlineColor: 'text-grey-darken-4',
    paragraphColor: 'text-grey-darken-1',
    quoteColor: 'text-grey-darken-3',
    buttonColor: 'grey-darken-4',
    accentColor: '#1a1a1a',
    cardBorderGradient: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
    cardBorderWidth: '3px'
  },

  // Cinza ultra claro - Separação sutil
  modernGrey: {
    isDark: false,
    backgroundColor: 'bg-grey-lighten-5',
    backgroundStyle: { background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)' },
    headlineColor: 'text-grey-darken-4',
    paragraphColor: 'text-grey-darken-1',
    quoteColor: 'text-grey-darken-3',
    buttonColor: 'grey-darken-4',
    accentColor: '#1a1a1a',
    cardBorderGradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cardBorderWidth: '3px'
  },

  // Preto profissional - Impacto e autoridade
  sectionDark: {
    isDark: true,
    backgroundColor: 'bg-grey-darken-4',
    backgroundStyle: { background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)' },
    headlineColor: 'text-white',
    paragraphColor: 'text-grey-lighten-1',
    quoteColor: 'text-white',
    buttonColor: 'white',
    accentColor: '#ffffff',
    cardBorderGradient: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)',
    cardBorderWidth: '3px'
  },

  // Cinza médio - Contraste equilibrado
  lightGrey: {
    isDark: false,
    backgroundColor: 'bg-grey-lighten-4',
    backgroundStyle: { background: 'linear-gradient(135deg, #f5f5f5 0%, #e8eaed 100%)' },
    headlineColor: 'text-grey-darken-4',
    paragraphColor: 'text-grey-darken-1',
    quoteColor: 'text-grey-darken-3',
    buttonColor: 'grey-darken-4',
    accentColor: '#1a1a1a',
    cardBorderGradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(99,99,99,0.7) 100%)',
    cardBorderWidth: '3px'
  },

  // Cinza escuro - Sofisticação com degradê do preto
  darkGrey: {
    isDark: true,
    backgroundColor: 'bg-grey-darken-3',
    backgroundStyle: { background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 50%, #2c2c2c 100%)' },
    headlineColor: 'text-white',
    paragraphColor: 'text-grey-lighten-2',
    quoteColor: 'text-white',
    buttonColor: 'white',
    accentColor: '#ffffff',
    cardBorderGradient: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)',
    cardBorderWidth: '3px'
  },

  // Tema com laranja - Energia e destaque
  orangeAccent: {
    isDark: false,
    backgroundColor: 'bg-white',
    backgroundStyle: { background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)' },
    headlineColor: 'text-grey-darken-4',
    paragraphColor: 'text-grey-darken-1',
    quoteColor: 'text-grey-darken-3',
    buttonColor: 'grey-darken-4',
    accentColor: '#fe5f04',
    cardBorderGradient: 'linear-gradient(135deg, rgba(254,95,4,0.8) 0%, rgba(254,95,4,0.4) 100%)',
    cardBorderWidth: '3px'
  }
};

/**
 * Retorna o esquema de cores solicitado ou o tema padrão.
 */
export function getThemeConfig(key) {
  return blockThemes[key] || blockThemes.modernWhite;
}

// Paleta BIM - Profissional e Moderna
export const bimPalette = {
  // Cores principais
  primary: '#1a1a1a',      // Preto profissional
  secondary: '#ffffff',    // Branco puro
  accent: '#fe5f04',       // Laranja vibrante
  
  // Tons de cinza estratégicos
  greys: {
    darkest: '#0d0d0d',    // Preto intenso
    dark: '#1a1a1a',       // Preto principal
    medium: '#424242',     // Cinza médio
    light: '#e0e0e0',      // Cinza claro
    lighter: '#f5f5f5',    // Cinza muito claro
    lightest: '#fafafa'    // Quase branco
  },
  
  // Gradientes sutis
  gradients: {
    white: 'linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%)',
    lightGrey: 'linear-gradient(180deg, #f5f5f5 0%, #eeeeee 100%)',
    dark: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
    mediumGrey: 'linear-gradient(180deg, #424242 0%, #303030 100%)'
  },
  
  // Uso estratégico
  usage: {
    hero: 'modernGrey',      // Cinza claro para hero
    content: 'modernWhite',  // Branco para conteúdo
    separator: 'lightGrey',  // Cinza médio para separação
    cta: 'sectionDark',      // Preto para CTAs
    accent: 'darkGrey'       // Cinza escuro para destaques
  }
}
