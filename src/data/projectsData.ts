export interface ProjectSpec {
  contexto: string;
  arquitetura: string;
  resultado: string;
}

export interface ProjectPhoto {
  url: string;
  caption: string;
}

export interface ProjectSubLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  type: string;
  subtitle?: string;
  directDescription: string;
  specs: ProjectSpec;
  tags: string[];
  photos?: ProjectPhoto[];
  liveUrl?: string;
  subLinks?: ProjectSubLink[];
  hasDashboardPhoto?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "industrial-pro",
    index: "01",
    title: "IndustrialPRO",
    type: "SISTEMA ERP INDUSTRIAL & PCP",
    subtitle: "Controle de fábrica, rastreamento de lote e custo real",
    directDescription:
      "Sistema feito sob medida para o chão de fábrica de uma indústria de postes poliméricos. Ele acompanha cada lote de matéria-prima desde a entrega do fornecedor até o poste pronto, calcula o custo exato de produção e organiza o estoque de ponta a ponta sem complicação.",
    specs: {
      contexto:
        "A fábrica usava papéis e planilhas confusas para controlar materiais e nunca sabia o custo exato para produzir cada poste.",
      arquitetura:
        "Criei um sistema que acompanha a matéria-prima do caminhão até a entrega, calcula as receitas de fabricação e organiza o estoque de forma automática.",
      resultado:
        "Fim dos erros manuais, controle de cada lote na fábrica e custo exato de produção calculado na hora.",
    },
    tags: [
      "ERP Industrial",
      "Rastreamento de Lotes",
      "Fórmulas de Produção",
      "Controle de Compras",
      "Cálculo de Custos",
    ],
    photos: [
      {
        url: "/pj-IndustrialPro-1.png",
        caption: "Cadastro de matérias-primas e comparação de fornecedores",
      },
      {
        url: "/pj-IndustrialPro-2.png",
        caption: "Painel geral da fábrica e acompanhamento do turno",
      },
      {
        url: "/pj-IndustrialPro-3.png",
        caption: "Catálogo de produtos com medidas dos postes",
      },
      {
        url: "/pj-IndustrialPro-4.png",
        caption: "Fórmulas de produção e mistura dos polímeros",
      },
    ],
  },
  {
    id: "digital-chaveiro",
    index: "02",
    title: "DigitalChaveiro",
    type: "SISTEMA ERP COMERCIAL & FRENTE DE CAIXA",
    subtitle: "PDV rápido, estoque integrado e comissões automáticas",
    directDescription:
      "ERP para o balcão de 2 lojas de chaveiro em SP. Controla milhares de pecinhas no estoque, agiliza as vendas com atalhos no teclado, calcula o lucro na hora e já separa a comissão de cada funcionário no fim do dia sem dor de cabeça.",
    specs: {
      contexto:
        "O chaveiro perdia muito tempo no atendimento anotando vendas no papel, procurando peças pequenas no estoque e calculando comissões à mão.",
      arquitetura:
        "Desenvolvi um sistema de caixa rápido e fácil de usar no teclado, que dá baixa automática no estoque e calcula a comissão de cada funcionário.",
      resultado:
        "Atendimento muito mais ágil no balcão, fechamento de caixa sem furos e comissões pagas certinhas todo dia.",
    },
    tags: [
      "ERP Comercial",
      "Frente de Caixa",
      "Lojas em SP",
      "Comissão Automática",
      "Estoque em Tempo Real",
    ],
    photos: [
      {
        url: "/pj-digital-chaveiro.png",
        caption: "Frente de caixa rápida com atalhos de teclado e comissões",
      },
    ],
  },
  {
    id: "gestor-pro",
    index: "03",
    title: "GestorPRO",
    type: "ERP GASTRONÔMICO & COMANDAS",
    subtitle: "Comandas em tempo real e estoque por peso (Kg)",
    directDescription:
      "ERP para restaurantes e bares com pratos artesanais. Os garçons lançam as comandas das mesas direto para a cozinha, e o estoque dá baixa por peso real dos ingredientes (gramas e quilos), cortando desperdícios e mostrando o lucro real do cardápio.",
    specs: {
      contexto:
        "O restaurante preparava pratos artesanais e perdia dinheiro por não saber o desperdício dos ingredientes nem o lucro real de cada prato.",
      arquitetura:
        "Montei um sistema de comandas onde os pedidos vão direto para a cozinha e o estoque desconta os ingredientes pelo peso exato (quilos e gramas).",
      resultado:
        "Comandas fechadas em segundos sem filas, menos desperdício de comida e visão clara do lucro de cada prato.",
    },
    tags: [
      "ERP Gastronômico",
      "Comandas de Mesas",
      "Estoque por Quilo",
      "Controle de Desperdício",
      "Lucro Real",
    ],
    photos: [
      {
        url: "/pj-varanda-1.png",
        caption: "Controle de estoque por peso e ingredientes críticos",
      },
      {
        url: "/pj-varanda-2.png",
        caption: "Painel de comandas abertas e fechamento rápido",
      },
    ],
  },
  {
    id: "agro-preciosa",
    index: "04",
    title: "Sistema de Loja Online (Agro Preciosa)",
    type: "E-COMMERCE & BACKOFFICE LOGÍSTICO",
    subtitle: "Loja virtual com painel de separação de pedidos",
    directDescription:
      "E-commerce com painel logístico para loja agropecuária. Os clientes compram rações e insumos pelo site de um jeito super fácil, e a equipe da loja recebe tudo num painel estilo Kanban para separar, despachar e já mandar o aviso no WhatsApp do cliente.",
    liveUrl: "https://www.lojaagropreciosa.com.br/",
    specs: {
      contexto:
        "A loja só vendia presencialmente e atendia clientes anotando pedidos no WhatsApp de forma desorganizada, gerando atrasos na entrega.",
      arquitetura:
        "Criei uma loja virtual fácil para o cliente comprar pelo celular, conectada a uma tela onde a equipe organiza os pacotes e avisa o cliente da entrega.",
      resultado:
        "Vendas online todos os dias, clientes novos de outros bairros e pedidos despachados na metade do tempo.",
    },
    tags: [
      "Loja Virtual",
      "Painel de Pedidos",
      "Separação & Entrega",
      "Aviso no WhatsApp",
      "Catálogo de Rações",
    ],
    photos: [
      {
        url: "/pj-agropreciosa-dashboard.png",
        caption: "Painel da loja: separação de pedidos em estilo Kanban",
      },
    ],
    hasDashboardPhoto: true,
  },
  {
    id: "faq-fatec",
    index: "05",
    title: "FAQFatec",
    type: "PORTAL ACADÊMICO & INICIAÇÃO CIENTÍFICA",
    subtitle: "Portal de dúvidas dos alunos com busca rápida",
    directDescription:
      "Portal de autoatendimento criado na Iniciação Científica da FATEC Itapira. Tira as dúvidas mais comuns dos alunos sobre rematrícula, atestados e horários em poucos segundos, esvaziando a fila da secretaria com uma busca rápida e moderna.",
    specs: {
      contexto:
        "Os alunos lotavam a secretaria da faculdade com as mesmas perguntas todo início de semestre (matrícula, atestados e horários).",
      arquitetura:
        "Criei uma barra de busca onde o aluno digita a dúvida e acha a resposta na hora, com uma área simples para os professores atualizarem as informações.",
      resultado:
        "Mais de 80% das dúvidas resolvidas direto pelo celular, esvaziando as filas na secretaria e sendo premiado na faculdade.",
    },
    tags: [
      "Iniciação Científica",
      "FATEC Itapira",
      "FAQ dos Alunos",
      "Busca Instantânea",
      "Painel de Moderação",
    ],
    photos: [
      {
        url: "/pj-faqfatec-inicial.png",
        caption: "Tela inicial do aluno com busca rápida e categorias",
      },
      {
        url: "/pj-faqfatec-admin-1.png",
        caption: "Painel para coordenadores adicionarem e editarem respostas",
      },
      {
        url: "/pj-faqfatec-admin-2.png",
        caption: "Filtro de perguntas por curso e ano",
      },
      {
        url: "/pj-faqfatec-admin-3.png",
        caption: "Controle de acesso dos professores e administradores",
      },
    ],
  },
  {
    id: "central-solucoes-sp",
    index: "06",
    title: "Central Soluções SP",
    type: "ECOSSISTEMA WEB INSTITUCIONAL & SEO LOCAL",
    subtitle: "Site institucional e páginas para chaveiro 24h e ar-condicionado",
    directDescription:
      "Vitrine digital com páginas focadas em converter clientes para serviços emergenciais na Grande SP (como chaveiro 24h e ar-condicionado). Cada página é rápida, otimizada para o Google e leva o cliente direto pro WhatsApp com um clique.",
    liveUrl: "https://www.centralsolucoessp.com.br/",
    subLinks: [
      { label: "Site Principal (Hub)", url: "https://www.centralsolucoessp.com.br/" },
      { label: "Climatizações", url: "https://www.centralsolucoessp.com.br/climatizacoes" },
      { label: "Chaveiro Pompeia", url: "https://www.centralsolucoessp.com.br/chaveiro-pompeia" },
    ],
    specs: {
      contexto:
        "A empresa prestava consertos urgentes, mas quase ninguém a encontrava na internet quando precisava de socorro rápido em São Paulo.",
      arquitetura:
        "Criei páginas velozes focadas em colocar a empresa no topo das buscas do Google, com botão para chamar socorro no WhatsApp com um único toque.",
      resultado:
        "Primeiras posições nas pesquisas do Google em SP e ligações diárias de pessoas precisando de chaveiro urgente ou conserto de ar-condicionado.",
    },
    tags: [
      "Sites Rápidos",
      "Google & SEO Local",
      "Chaveiro 24h",
      "Climatização SP",
      "Direto pro WhatsApp",
    ],
  },
  {
    id: "sunalways",
    index: "07",
    title: "SunAlways — Aquecedor Solar Reciclável",
    type: "ENGENHARIA SUSTENTÁVEL & TERMODINÂMICA",
    subtitle: "Aquecedor solar feito com garrafa PET e caixa de leite",
    directDescription:
      "Site feito para apresentar um projeto de engenharia da FACAMP: um aquecedor solar térmico montado com garrafas PET e caixas de leite Tetra Pak. A página mostra como montar, os dados de calor coletados e como funciona a troca térmica de forma simples.",
    liveUrl: "https://sunalways.vercel.app/",
    specs: {
      contexto:
        "Famílias de baixa renda gastam muito na conta de luz para ter água quente no chuveiro por não terem acesso a aquecedores caros.",
      arquitetura:
        "Desenvolvi um site interativo que ensina como montar o aquecedor ecológico com garrafas PET e caixas de leite, mostrando como a água esquenta ao longo do dia.",
      resultado:
        "Provou que é possível ter água quente gastando quase nada, com o projeto sendo elogiado pelos professores de engenharia.",
    },
    tags: [
      "Projeto FACAMP",
      "Engenharia Térmica",
      "Garrafas PET",
      "Energia Solar",
      "Sustentabilidade",
    ],
  },
  {
    id: "gabynavif-portfolio",
    index: "08",
    title: "Portfólio Digital Gabynavif",
    type: "PORTFÓLIO CRIATIVO & BRANDING",
    subtitle: "Site pessoal para exibir projetos de branding e design",
    directDescription:
      "Portfólio visual criado para a designer Gabriela expor seus trabalhos de branding e direção de arte. Tem visual limpo, transições suaves e fotos grandes em alta qualidade para encantar agências e marcas de moda.",
    liveUrl: "https://gabynavif-portfolio.vercel.app/",
    specs: {
      contexto:
        "A designer Gabriela tinha trabalhos incríveis, mas não tinha uma página oficial na internet para mostrar seu trabalho para grandes marcas e empresas.",
      arquitetura:
        "Desenvolvi um site visual que carrega fotos pesadas instantaneamente sem travar, com animações suaves e visual sofisticado para valorizar cada criação.",
      resultado:
        "Um endereço oficial de alto padrão que passou muito mais credibilidade e ajudou a fechar contratos maiores de design.",
    },
    tags: [
      "Design Gráfico",
      "Branding",
      "Portfólio Pessoal",
      "Animações Leves",
      "Visual Editorial",
    ],
  },
  {
    id: "senhas-tv-corporativa",
    index: "09",
    title: "Sistema de Senhas & TV Corporativa",
    type: "SISTEMA DISTRIBUÍDO EM TEMPO REAL",
    subtitle: "Chamada de senhas na TV e anúncios da loja em tempo real",
    directDescription:
      "Sistema em tempo real que junta a TV da loja com a chamada de senhas. A TV passa propagandas, avisos e toca o sinal da vez; o atendente chama a próxima senha pelo computador sem atraso, e a gerência troca os anúncios pelo celular de onde estiver.",
    specs: {
      contexto:
        "A loja tinha filas bagunçadas de clientes e uma televisão no salão que ficava ligada em canais de TV comuns sem ajudar nas vendas.",
      arquitetura:
        "Criei um sistema que liga a TV do salão aos computadores: a tela chama as senhas com som e passa os anúncios da loja que o gerente troca pelo celular.",
      resultado:
        "Fim da desorganização na fila, clientes mais confortáveis e aumento nas vendas dos produtos anunciados na tela.",
    },
    tags: [
      "WebSockets",
      "TV da Loja",
      "Chamada de Senhas",
      "Anúncios na TV",
      "Tempo Real",
    ],
    photos: [
      {
        url: "/pj-senhas-tv.png",
        caption: "Tela da TV: senha atual no topo e anúncios passando embaixo",
      },
      {
        url: "/pj-senhas-pc.png",
        caption: "Painel do atendente no computador: chamar, repetir e voltar",
      },
      {
        url: "/pj-senhas-gestor.png",
        caption: "Painel do gerente para trocar anúncios e vídeos da TV pelo celular",
      },
    ],
  },
];
