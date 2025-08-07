export interface ClimateEvent {
  id: string;
  tipo: EventType;
  local: string;
  gravidade: EventSeverity;
  inicio: string;
  fim: string;
  descricao: string;
}

export type EventType =
  | "onda_de_calor"
  | "enchente"
  | "vendaval"
  | "incendio"
  | "queimada"
  | "projecao_carga_energia";

export type EventSeverity = "baixa" | "média" | "alta";

export interface EventFilters {
  tipo?: EventType;
  gravidade?: EventSeverity;
  local?: string;
  regions?: Region[];
}

export interface Region {
  lat: number;
  lng: number;
  name: string;
}

export interface EventsState {
  events: ClimateEvent[];
  filteredEvents: ClimateEvent[];
  selectedEvent: ClimateEvent | null;
  filters: EventFilters;
  isLoading: boolean;
  error: string | null;
}
