export const homeenUS = {
  header: {
    title: "Climate Monitoring System",
    subtitle: "Real-time climate event monitoring",
    systemStatus: "System Active",
  },
  filters: {
    title: "Filters",
    clearButton: "Clear",
    eventType: {
      label: "Event Type",
      placeholder: "All types",
    },
    severity: {
      label: "Severity",
      placeholder: "All severities",
    },
    location: {
      label: "Location",
      placeholder: "Enter location...",
    },
    regionFilter: {
      title: "State Filter",
      selectedStates: "Selected States:",
      instructions:
        "Click on colored circles to filter climate events by state",
    },
  },
  events: {
    title: "Climate Events",
    loading: "Loading events...",
    error: "Error loading events",
    empty: {
      title: "No events found",
      description: "Try adjusting the filters to find events.",
    },
    count: {
      one: "event found",
      many: "events found",
    },
  },
  eventTypes: {
    onda_de_calor: "Heat Wave",
    enchente: "Flood",
    vendaval: "Storm",
    incendio: "Fire",
    queimada: "Wildfire",
    projecao_carga_energia: "Energy Projection",
  },
  severity: {
    alta: "High",
    média: "Medium",
    baixa: "Low",
  },
  map: {
    loading: "Loading Brazil map...",
    unavailable: "Map unavailable",
    fallbackDescription: "Use the state list below",
    statesWithEvents: "States with Climate Events:",
    legend: {
      title: "Climate Event Types:",
      onda_de_calor: "Heat Wave",
      enchente: "Flood",
      vendaval: "Storm",
      incendio: "Fire",
      queimada: "Wildfire",
      projecao_carga_energia: "Energy Projection",
    },
  },
  modal: {
    close: "Close",
    location: "Location",
    period: "Period",
    start: "Start",
    end: "End",
    description: "Description",
    severity: "Severity",
    activeEvent: "Active Event",
  },
  loading: {
    app: "Loading application...",
  },
  dates: {
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    thisWeek: "This week",
    nextWeek: "Next week",
    ago: "ago",
    in: "in",
    now: "now",
    justNow: "just now",
  },
};
