# BIM PV Curso

Landing page moderna para o curso BIM Coordinator da BIMM Smart, desenvolvida com tecnologias de ponta.

## 🚀 Tecnologias e Diferenciais

### Stack Frontend Moderna
- **Vue.js 3.5+** - Framework progressivo com Composition API e melhor performance
- **Vuetify 3.7+** - Sistema de design Material com componentes pré-construídos
- **Vite 5.4+** - Build tool ultrarrápido com HMR (Hot Module Replacement)
- **Vue Router 4** - Roteamento oficial para aplicações Vue.js SPA

### Arquitetura Avançada
- **Estrutura Modular** - Organização de código escalável e manutenível
- **Componentes Reutilizáveis** - Design system consistente e eficiente
- **Layouts Dinâmicos** - Usando vite-plugin-vue-layouts para gerenciamento de layouts
- **Auto-importação** - Plugins unplugin para importação automática de componentes

### Performance e UX
- **Lazy Loading** - Carregamento sob demanda para melhor performance
- **Animações Otimizadas** - Usando Intersection Observer para animações eficientes
- **Design Responsivo** - Experiência consistente em todos os dispositivos
- **Formulários Inteligentes** - Validação e máscaras para melhor UX

## 🛠️ Configuração do Ambiente

Este projeto utiliza variáveis de ambiente para armazenar chaves sensíveis. Siga os passos abaixo para configurar:

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Preencha as variáveis no arquivo `.env` com os valores corretos:

```
# API Keys
VITE_MAKE_API_KEY=sua_chave_api_aqui

# Webhooks
VITE_MAKE_WEBHOOK_URL=url_webhook_aqui
```

3. As variáveis de ambiente são verificadas automaticamente durante a inicialização em modo de desenvolvimento.

## 📦 Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Visualizar build de produção localmente
npm run preview

# Executar linting
npm run lint
```

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios
```
src/
├── assets/           # Imagens e recursos estáticos
├── components/       # Componentes Vue reutilizáveis
│   ├── ui/           # Componentes de interface do usuário
│   └── ...           # Componentes específicos de página
├── config/           # Configurações centralizadas
│   └── pageConfig.js # Configuração da estrutura da página
├── content/          # Conteúdo textual separado da lógica
│   └── cursoContent.js
├── helpers/          # Funções auxiliares
│   └── blockThemes.js # Temas e estilos centralizados
├── layouts/          # Layouts de página
├── plugins/          # Plugins Vue e configurações
├── router/           # Configuração de rotas
├── utils/            # Utilitários gerais
│   └── env.js        # Utilitários para variáveis de ambiente
└── views/            # Componentes de página
```

### Principais Recursos Arquiteturais

#### 1. Configuração Centralizada (src/config/pageConfig.js)
- Define a estrutura da página, ordem dos blocos e temas
- Facilita alterações na estrutura sem modificar componentes

#### 2. Separação de Conteúdo (src/content/cursoContent.js)
- Todo o conteúdo textual centralizado
- Facilita manutenção, tradução e atualizações de conteúdo

#### 3. Sistema de Temas (src/helpers/blockThemes.js)
- Paleta de cores moderna e consistente
- Temas reutilizáveis em toda a aplicação

#### 4. Componentes Animados
- Sistema de animações baseado em Intersection Observer
- Carregamento eficiente e transições suaves

## 🎨 Personalização

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

## 📱 Recursos Responsivos

O projeto foi desenvolvido com foco em experiência mobile-first, garantindo:

- Layouts adaptáveis para todos os tamanhos de tela
- Otimização de imagens para diferentes dispositivos
- Interações touch-friendly para dispositivos móveis
- Performance otimizada para conexões móveis

## 📄 Licença

Todos os direitos reservados © BIMM Smart 2024