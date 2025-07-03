// src/config/pageConfig.js

export const defaultPageConfig = {
  header: {
    show: true,
    themeKey: 'sectionDark'
  },

  hero: {
    show: true,
    themeKey: 'modernWhite',
    showBackground: false
  },

  blocks: [
    { type: 'empatia', themeKey: 'lightGrey' },

    { type: 'contexto', themeKey: 'darkGrey' },
    { type: 'solucao', themeKey: 'modernWhite' },
    { type: 'diferencial', themeKey: 'modernGrey' },
    { type: 'stack', themeKey: 'modernWhite' },
    { type: 'objections', themeKey: 'lightGrey' },
    { type: 'garantia', themeKey: 'sectionDark' },
    { type: 'urgencia', themeKey: 'modernWhite' },
    { type: 'cta', themeKey: 'sectionDark' },
    { type: 'sobre', themeKey: 'modernWhite' }
  ],

  animations: {
    enabled: true,
    baseDelay: 50,
    increment: 100
  }
}

export function createPageConfig(customConfig = {}) {
  return {
    ...defaultPageConfig,
    ...customConfig,
    header: {
      ...defaultPageConfig.header,
      ...customConfig.header
    },
    hero: {
      ...defaultPageConfig.hero,
      ...customConfig.hero
    },
    blocks: customConfig.blocks || defaultPageConfig.blocks,
    animations: {
      ...defaultPageConfig.animations,
      ...customConfig.animations
    }
  }
}