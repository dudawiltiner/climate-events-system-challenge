import { ClimateEvent } from "@utils/types/event.types";

const mockEvents: ClimateEvent[] = [
  {
    id: "1",
    tipo: "onda_de_calor",
    local: "Fortaleza - CE",
    gravidade: "alta",
    inicio: "2025-07-30T10:00:00Z",
    fim: "2025-08-01T18:00:00Z",
    descricao: "Temperaturas 5ºC acima da média para o período.",
  },
  {
    id: "2",
    tipo: "enchente",
    local: "São Paulo - SP",
    gravidade: "média",
    inicio: "2025-08-02T06:00:00Z",
    fim: "2025-08-03T12:00:00Z",
    descricao: "Acúmulo de chuvas pode causar alagamentos em áreas de risco.",
  },
  {
    id: "3",
    tipo: "vendaval",
    local: "Curitiba - PR",
    gravidade: "alta",
    inicio: "2025-08-01T15:00:00Z",
    fim: "2025-08-01T22:00:00Z",
    descricao:
      "Rajadas de vento acima de 80 km/h com risco de queda de árvores.",
  },
  {
    id: "4",
    tipo: "incendio",
    local: "Brasília - DF",
    gravidade: "baixa",
    inicio: "2025-07-29T09:00:00Z",
    fim: "2025-07-29T14:00:00Z",
    descricao:
      "Queima controlada monitorada em área rural. Sem risco à população.",
  },
  {
    id: "5",
    tipo: "onda_de_calor",
    local: "Teresina - PI",
    gravidade: "média",
    inicio: "2025-07-31T11:00:00Z",
    fim: "2025-08-02T19:00:00Z",
    descricao: "Temperaturas acima de 38ºC com sensação térmica elevada.",
  },
  {
    id: "6",
    tipo: "queimada",
    local: "Rondônia - RO",
    gravidade: "alta",
    inicio: "2025-07-28T13:00:00Z",
    fim: "2025-07-30T20:00:00Z",
    descricao:
      "Foco de incêndio florestal com fumaça visível na região urbana.",
  },
  {
    id: "7",
    tipo: "enchente",
    local: "Manaus - AM",
    gravidade: "baixa",
    inicio: "2025-08-03T04:00:00Z",
    fim: "2025-08-04T07:00:00Z",
    descricao: "Alagamento leve em áreas ribeirinhas. Monitoramento ativo.",
  },
  {
    id: "8",
    tipo: "projecao_carga_energia",
    local: "Belo Horizonte - MG",
    gravidade: "média",
    inicio: "2025-08-01T08:00:00Z",
    fim: "2025-08-01T20:00:00Z",
    descricao: "Demanda energética elevada devido ao uso de ar-condicionado.",
  },
  {
    id: "9",
    tipo: "vendaval",
    local: "Porto Alegre - RS",
    gravidade: "alta",
    inicio: "2025-07-30T10:00:00Z",
    fim: "2025-07-30T16:00:00Z",
    descricao:
      "Ventos de até 100 km/h com risco estrutural em edificações frágeis.",
  },
  {
    id: "10",
    tipo: "queimada",
    local: "Campo Grande - MS",
    gravidade: "média",
    inicio: "2025-08-02T10:00:00Z",
    fim: "2025-08-03T18:00:00Z",
    descricao:
      "Foco de queimada em área agrícola, afetando qualidade do ar local.",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const eventsService = {
  async getEvents(): Promise<ClimateEvent[]> {
    try {
      const loadingTime = Math.random() * 2000 + 1000;
      await delay(loadingTime);

      if (Math.random() < 0.05) {
        throw new Error("Erro simulado na API");
      }

      return mockEvents;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      throw new Error("Falha ao carregar eventos climáticos");
    }
  },

  async getEventById(id: string): Promise<ClimateEvent | null> {
    try {
      const loadingTime = Math.random() * 1000 + 500;
      await delay(loadingTime);

      const event = mockEvents.find((e) => e.id === id);

      if (!event) {
        return null;
      }

      return event;
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      throw new Error("Falha ao carregar evento");
    }
  },
};
