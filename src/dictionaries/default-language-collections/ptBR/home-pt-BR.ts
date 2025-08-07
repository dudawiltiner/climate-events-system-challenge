export const homeptBR = {
  header: {
    title: "Sistema de Monitoramento Climático",
    subtitle: "Monitoramento em tempo real de eventos climáticos",
    systemStatus: "Sistema Ativo",
  },
  filters: {
    title: "Filtros",
    clearButton: "Limpar",
    eventType: {
      label: "Tipo de Evento",
      placeholder: "Todos os tipos",
    },
    severity: {
      label: "Gravidade",
      placeholder: "Todas as gravidades",
    },
    location: {
      label: "Local",
      placeholder: "Digite o local...",
    },
    regionFilter: {
      title: "Filtro por Estado",
      selectedStates: "Estados Selecionados:",
      instructions:
        "Clique nos círculos coloridos para filtrar eventos climáticos por estado",
    },
  },
  events: {
    title: "Eventos Climáticos",
    loading: "Carregando eventos...",
    error: "Erro ao carregar eventos",
    empty: {
      title: "Nenhum evento encontrado",
      description: "Tente ajustar os filtros para encontrar eventos.",
    },
    count: {
      one: "evento encontrado",
      many: "eventos encontrados",
    },
  },
  eventTypes: {
    onda_de_calor: "Onda de Calor",
    enchente: "Enchente",
    vendaval: "Vendaval",
    incendio: "Incêndio",
    queimada: "Queimada",
    projecao_carga_energia: "Projeção Energética",
  },
  severity: {
    alta: "Alta",
    média: "Média",
    baixa: "Baixa",
  },
  map: {
    loading: "Carregando mapa do Brasil...",
    unavailable: "Mapa não disponível",
    fallbackDescription: "Use a lista de estados abaixo",
    statesWithEvents: "Estados com Eventos Climáticos:",
    legend: {
      title: "Tipos de Eventos Climáticos:",
      onda_de_calor: "Onda de Calor",
      enchente: "Enchente",
      vendaval: "Vendaval",
      incendio: "Incêndio",
      queimada: "Queimada",
      projecao_carga_energia: "Projeção Energética",
    },
  },
  modal: {
    close: "Fechar",
    location: "Localização",
    period: "Período",
    start: "Início",
    end: "Fim",
    description: "Descrição",
    severity: "Gravidade",
    activeEvent: "Evento Ativo",
  },
  loading: {
    app: "Carregando aplicação...",
  },
  dates: {
    today: "Hoje",
    yesterday: "Ontem",
    tomorrow: "Amanhã",
    thisWeek: "Esta semana",
    nextWeek: "Próxima semana",
    ago: "atrás",
    in: "em",
    now: "agora",
    justNow: "agora mesmo",
  },
};
