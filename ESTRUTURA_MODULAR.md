# Estrutura Modular - BIM PV Curso

## Visão Geral
Este projeto agora utiliza uma estrutura modular que permite configuração centralizada e reutilização de componentes.

## Arquivos Principais

### 📁 src/config/pageConfig.js
- Configuração centralizada da página
- Define ordem dos blocos, temas e animações
- Permite customização fácil da estrutura

### 📁 src/content/cursoContent.js
- Todo o conteúdo da página centralizado
- Facilita manutenção e tradução
- Separação clara entre estrutura e conteúdo

### 📁 src/helpers/blockThemes.js
- **Nova paleta moderna**: branco, preto e tons de cinza
- Temas consistentes em toda a aplicação
- Fácil manutenção das cores

## Principais Mudanças

### 🎨 Paleta de Cores
- **modernWhite**: Fundo branco puro (#ffffff)
- **modernGrey**: Cinza claro moderno (#fafafa)
- **sectionDark**: Preto elegante (#212121)
- **lightGrey**: Cinza médio para separação (#f5f5f5)

### 🖼️ Hero Section
- **Sem fundo**: Apenas imagem de capa, conforme solicitado
- Conteúdo vem do arquivo `cursoContent.js`
- Responsivo e modular

### ✨ Animações
- Componente `FadeInSection` para transições suaves
- Delays configuráveis
- Intersection Observer para performance

## Como Usar

### Modificar Conteúdo
```javascript
// src/content/cursoContent.js
export const cursoContent = {
  hero: {
    headline: 'Seu novo título aqui',
    // ...
  }
}
```

### Alterar Ordem dos Blocos
```javascript
// src/config/pageConfig.js
blocks: [
  { type: 'hero', themeKey: 'modernGrey' },
  { type: 'empatia', themeKey: 'lightGrey' },
  // ...
]
```

### Customizar Cores
```javascript
// src/helpers/blockThemes.js
modernWhite: {
  backgroundColor: 'bg-white',
  headlineColor: 'text-grey-darken-4',
  // ...
}
```

## Benefícios
- ✅ Manutenção mais fácil
- ✅ Reutilização de código
- ✅ Configuração centralizada
- ✅ Paleta moderna e consistente
- ✅ Performance otimizada com animações