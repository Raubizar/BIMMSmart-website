// src/content/cursoContent.js

import capaImage from '@/assets/capa.jpg'
import sobreImage from '@/assets/sobre.png'
import garantiaImage from '@/assets/garantia.png'

export const cursoContent = {
  header: {
    alertTitle: 'Pré-Inscrição Termina em',
    alertSubtitle: 'Turma com apenas 6 vagas',
    alertIcon: 'mdi-flash',
    showCountdown: true
  },

  hero: {
    headline: {
      desktop: 'Aprenda a ser BIM Coordinator na Irlanda em 12 semanas',
      mobile: 'Aprenda a ser BIM Coordinator na Irlanda em 12 semanas'
    },
    subheadline: {
      desktop: 'Treinamento prático e ao vivo com Rubens Lage — Mestre em BIM com experiência em projetos de Data Centers, residenciais e industriais, incluindo um projeto de €7 bilhões.',
      mobile: 'Treinamento prático e ao vivo com Rubens Lage — Mestre em BIM.'
    },
    cta: 'Fazer pré-inscrição',
    image: capaImage,
    imageAlt: 'Capa do Curso BIM Coordinator',
    bulletsTitle: 'Por que se tornar BIM Coordinator?',
    bullets: [
      'Salários maiores e trabalho híbrido',
      'Automação BIM mudando rapidamente o mercado — quem não evoluir vai ficar para trás',
      'Passo essencial para virar BIM Manager',
      'Menos tarefas manuais, mais estratégicas',
      'Mercado demandando especialmente em projetos de datacenter, industriais e residenciais'
    ]
  },

  empatia: {
    headline: "Você já domina o Revit. Mas está pronto para coordenar um projeto inteiro?",
    context: "Se você já trabalha com modelagem BIM — seja na Irlanda ou ainda no Brasil — percebeu que só dominar ferramentas não é suficiente. Coordenar exige outras habilidades.",
    painPoints: [
      { title: "Decisões sob pressão", description: "Lidar sozinho com decisões complexas, conflitos entre disciplinas, prazos apertados e entregas exigentes.", icon: "mdi-alert-circle-outline" },
      { title: "Insegurança Técnica", description: "Dificuldade em configurar CDE, criar BEP completo e rodar Clash Detection com confiança.", icon: "mdi-layers-triple-outline" },
      { title: "Comunicação Exigente", description: "Precisar justificar escolhas técnicas de maneira clara e segura perante clientes e colegas.", icon: "mdi-account-voice" },
      { title: "Oportunidades Perdidas", description: "Já deixou passar boas vagas por não se sentir preparado para assumir a coordenação.", icon: "mdi-hand-back-left-off" }
    ],
    quote: 'Sua dificuldade não é falta de capacidade — é falta de treinamento prático como o mercado exige de verdade.'
  },

  contexto: {
    headline: 'A transição do BIM já começou e exige outro tipo de profissional.',
    paragraphs: [
      'A automação já impacta diretamente os modeladores BIM.',
      'Empresas e governos agora exigem profissionais com capacidade real de coordenação.',
      'O mercado precisa de pessoas que saibam gerenciar processos, conflitos e entregas complexas.'
    ],
    reforcoText: 'O mercado não precisa de mais gente que sabe modelar. Precisa de quem sabe coordenar.',
    bullets: [
      { title: 'Comunicação', description: 'Clara e assertiva', icon: 'mdi-account-voice' },
      { title: 'Gestão de Conflitos', description: 'Prevenir problemas antes que surjam', icon: 'mdi-shield-alert' },
      { title: 'Responsabilidade Técnica', description: 'Decisões seguras e bem fundamentadas', icon: 'mdi-file-document-outline' },
      { title: 'Autonomia', description: 'Menos supervisão, mais confiança nas entregas', icon: 'mdi-briefcase-check-outline' }
    ],
    quote: 'Quem não dominar coordenação BIM logo estará fora do mercado. Essa mudança já está acontecendo.',
    illustration: '/src/assets/ilustracao-simbolica.png',
    illustrationAlt: 'Ilustração simbólica'
  },

  solucao: {
    headline: 'O curso que prepara você para coordenar projetos reais na Irlanda.',
    subheadline: '12 semanas práticas com desafios reais e feedback individualizado.',
    intro: 'Você vai vivenciar:',
    experiencias: [
      { icon: 'mdi-television-ambient-light', title: 'Reuniões semanais', description: 'Encontros reais via MS Teams, simulando um ambiente profissional.' },
      { icon: 'mdi-clipboard-text-outline', title: 'Tarefas reais', description: 'Entregas, mudanças e exigências iguais às de um cliente real.' },
      { icon: 'mdi-file-tree', title: 'BEP personalizado', description: 'Criação e configuração de BEP e CDE para projetos reais.' },
      { icon: 'mdi-vector-intersection', title: 'Clash Detection', description: 'Rodar e apresentar conflitos técnicos de forma segura e profissional.' },
      { icon: 'mdi-book-open-variant', title: 'Padrões Irlandeses', description: 'Aprenda e aplique os padrões RIBA e práticas locais.' },
      { icon: 'mdi-account-check', title: 'Feedback semanal', description: 'Acompanhamento individualizado para melhorias constantes.' },
      { icon: 'mdi-certificate', title: 'Avaliação final', description: 'Score final e certificado com destaque de habilidades adquiridas.' }
    ],
    cta: 'Quero essa imersão',
    quote: 'Mais que aulas, uma experiência prática real.'
  },

  diferencial: {
    headline: 'O que torna este treinamento realmente diferente',
    intro: 'Você já viu cursos que prometem transformar sua carreira com algumas videoaulas e fórmulas prontas. Este não é um deles.',
    subtitle: 'Aqui, você:',
    items: [
      { icon: 'mdi-account-circle', title: 'Acompanhamento de perto', description: 'Por quem já viveu o cargo.' },
      { icon: 'mdi-clipboard-text-outline', title: 'Tarefas reais', description: 'Com feedback técnico sobre acertos e melhorias.' },
      { icon: 'mdi-layers', title: 'Processo completo', description: 'Não só ferramentas, mas todo o ciclo de coordenação.' },
      { icon: 'mdi-briefcase-check', title: 'Casos reais', description: 'Projetos autênticos, não genéricos.' }
    ],
    benefits: 'Mais do que conteúdo, você recebe pressão controlada, ambiente seguro e desafios reais.',
    analogy: 'Como um simulador de voo: você treina para situações reais antes de entrar em campo de verdade.',
    quote: 'E quem está do outro lado avaliando seu desempenho, já sentou exatamente na cadeira que você quer ocupar.'
  },

  stack: {
    headline: 'Tudo que você recebe no curso',
    subIntro: 'Além do treinamento prático ao vivo, você também recebe:',
    stacks: [
      {
        title: 'Aulas do Curso',
        items: [
          { title: '12 Aulas ao Vivo', description: 'Encontros semanais com instrução prática e feedback individualizado.', icon: 'mdi-video-account' },
          { title: '24 Horas de Conteúdo', description: 'Treinamento intensivo focado em coordenação BIM real.', icon: 'mdi-clock-outline' },
          { title: 'Atividades Práticas', description: 'Exercícios reais para aplicar o conhecimento imediatamente.', icon: 'mdi-hammer-wrench' },
          { title: 'Certificado', description: 'Com avaliação final do seu desempenho.', icon: 'mdi-certificate', highlight: true }
        ]
      },
      {
        title: 'Bônus',
        items: [
          { title: 'Guia de Plugins', description: 'Essenciais para Revit focados em coordenação.', icon: 'mdi-puzzle-outline' },
          { title: 'Template de BEP', description: 'Completo e pronto para usar em projetos reais.', icon: 'mdi-file-document-outline' },
          { title: 'eBook Clash Detection', description: 'Guia exclusivo com técnicas avançadas.', icon: 'mdi-book-open-variant' },
          { title: 'Mentoria 1:1', description: 'Sessão de 45 min ao final do curso com feedback personalizado para alavancar sua carreira.', icon: 'mdi-account-supervisor', highlight: true }
        ]
      }
    ],

    closing: 'Este curso entrega resultados claros, rápidos e uma evolução profissional visível já nas primeiras semanas.'
  },

  objections: {
    headline: 'E se eu não estiver pronto para esse upgrade na carreira?',
    intro: 'Essa é uma dúvida comum.',
    truthQuote: 'Você não precisa estar pronto. Esse treinamento existe exatamente porque você ainda não viveu a coordenação na prática.',
    forWho: {
      title: 'Este curso é para você se:',
      items: [
        'Já atua com BIM e quer avançar na carreira',
        'Está na Irlanda (ou se preparando para ir)',
        'Quer mais reconhecimento, autonomia e confiança profissional',
        'Está pronto para parar de adiar e começar a praticar, com apoio real',
        'Atua com modelagem, mas quer mais responsabilidade',
        'Quer se sentir seguro para aplicar para cargos melhores'
      ]
    },
    notForWho: {
      title: 'Este curso NÃO é para você se:',
      items: [
        'Não quer trabalhar na Irlanda',
        'Não quer crescer na carreira BIM',
        'Está satisfeito apenas modelando',
        'Não tem interesse em coordenação',
        'Busca apenas conhecimento teórico',
        'Não quer assumir mais responsabilidades'
      ]
    },
    reinforcement: 'Não saber tudo ainda não é um problema. O que conta aqui é a sua disposição para entrar no jogo, treinar de verdade e sair com mais preparo do que muita gente que já está coordenando por aí.',
    finalQuote: 'Você não vai ser jogado no escuro. Vai ter apoio, correção, acompanhamento — e a liberdade de errar enquanto aprende.'
  },

  garantia: {
    headline: 'Risco Zero',
    description: [
      'Se em 7 dias você sentir que não vai fazer diferença real na sua carreira, devolvemos seu dinheiro. Simples e transparente.'
    ],
    points: [],
    quote: 'Garantia Total',
    image: garantiaImage,
    imageAlt: 'Garantia de reembolso'
  },

  urgencia: {
    headline: 'Essa oportunidade só acontece - no máximo - uma vez por ano.',
    subIntro: 'Este é um curso ao vivo, com feedback individual, simulação prática e acompanhamento próximo. Isso significa que não dá para abrir turmas o tempo todo — nem aceitar muitas pessoas de uma vez. Por isso:',
    points: [
      { text: 'Apenas 6 vagas disponíveis para garantir qualidade e atenção individual', icon: 'mdi-account-group' },
      { text: 'Acesso ao Rubens como cliente real só nessa edição', icon: 'mdi-account-star' },
      { text: 'Bônus extras e correção individual podem não estar disponíveis nas próximas turmas', icon: 'mdi-gift' }
    ],
    image: '/src/assets/curso.jpg',
    imageAlt: 'Urgência e Escassez',
    quote: 'Esperar pode custar caro — não só no preço do curso, mas nas oportunidades que você vai continuar deixando passar.'
  },

  cta: {
    headline: 'Pronto para subir de nível? Aqui está seu próximo passo.',
    subHeadline: 'Você já tem a base técnica. Agora é hora de treinar como um coordenador de verdade — com simulação, feedback e segurança.',
    emphasis: 'São 12 semanas de treino prático, estrutura profissional e evolução visível. Vagas limitadas a 6 alunos. Faça sua pré-inscrição agora e garanta sua vaga na turma mais completa para se tornar BIM Coordinator na Irlanda.',
    ctaText: 'Quero fazer parte dessa turma'
  },

  sobre: {
    headline: 'Sobre Rubens Lage',
    image: '/src/assets/palestra.jpg',
    imageAlt: 'Foto de Rubens Lage',
    paragraphs: [
      'Rubens Lage é engenheiro civil com mestrado em Applied BIM Management, e atualmente atua como Digital Project Manager em alguns dos maiores e mais complexos projetos da Europa, especialmente em data centers.',
      'Com mais de uma década de experiência prática, ele lidera projetos de Data Centers, residenciais e industriais, incluindo um projeto de €7 bilhões na Irlanda, aplicando tecnologias inovadoras em BIM, automação e fluxos de informação.',
      'Conhecido na comunidade técnica como "O Cara do BIM", Rubens é reconhecido por transformar processos complexos em resultados claros e eficientes, destacando-se especialmente por sua habilidade em simplificar desafios técnicos em soluções práticas.',
      'Sua abordagem prática e direta faz dele não apenas um instrutor excepcional, mas também o mentor ideal para profissionais que desejam dar o próximo passo na carreira BIM e se tornarem coordenadores confiantes e capacitados.'
    ]
  }
}