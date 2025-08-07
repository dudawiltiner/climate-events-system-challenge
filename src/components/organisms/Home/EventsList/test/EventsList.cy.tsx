import { AS } from "@utils/enums/assertions.enum";
import { ClimateEvent } from "@utils/types/event.types";
import EventsList from "../EventsList";
import { EVENTS_LIST_ELEMENTS } from "../EventsList.enum";

const mockEvents: ClimateEvent[] = [
  {
    id: "1",
    tipo: "vendaval",
    gravidade: "média",
    local: "Salvador, BA",
    inicio: "2025-07-30T10:00:00Z",
    fim: "2025-08-01T18:00:00Z",
    descricao:
      "Vendaval com ventos fortes e chuvas intensas na região de Salvador.",
  },
  {
    id: "2",
    tipo: "enchente",
    gravidade: "alta",
    local: "São Paulo, SP",
    inicio: "2025-07-31T08:00:00Z",
    fim: "2025-08-02T20:00:00Z",
    descricao: "Enchente com alagamentos em várias regiões da cidade.",
  },
];

const mockSingleEvent: ClimateEvent[] = [
  {
    id: "1",
    tipo: "onda_de_calor",
    gravidade: "baixa",
    local: "Rio de Janeiro, RJ",
    inicio: "2025-08-01T12:00:00Z",
    fim: "2025-08-03T18:00:00Z",
    descricao: "Onda de calor com temperaturas elevadas.",
  },
];

describe("<EventsList />", () => {
  it("should render the EventsList with events", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.COUNT).should(AS.EXIST);
  });

  it("should display the correct title", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.CONTAINER).should(
      AS.CONTAIN,
      "Eventos"
    );
  });

  it("should display correct event count for multiple events", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.COUNT).should(AS.CONTAIN, "2");
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.COUNT).should(AS.CONTAIN, "eventos");
  });

  it("should display correct event count for single event", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockSingleEvent}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.COUNT).should(AS.CONTAIN, "1");
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.COUNT).should(AS.CONTAIN, "evento");
  });

  it("should render EventCard components for each event", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID)
      .find('[data-cy="event-card"]')
      .should(AS.HAVE_LENGTH, 2);
  });

  it("should handle event click through EventCard", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID)
      .find('[data-cy="event-card"]')
      .first()
      .click();
    cy.get("@onEventClickSpy").should("have.been.calledWith", mockEvents[0]);
  });

  it("should show loading state", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={[]}
        isLoading={true}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.LOADING).should(AS.EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.LOADING).should(
      AS.CONTAIN,
      "Carregando"
    );
  });

  it("should show error state", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");
    const errorMessage = "Erro ao carregar eventos";

    cy.mount(
      <EventsList
        events={[]}
        isLoading={false}
        error={errorMessage}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.ERROR).should(AS.EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.ERROR).should(AS.CONTAIN, errorMessage);
  });

  it("should show empty state when no events", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={[]}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.EMPTY).should(AS.EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.EMPTY).should(
      AS.CONTAIN,
      "Nenhum evento encontrado"
    );
  });

  it("should have correct styling classes", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "space-y-6"
    );
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.HAVE_CLASS, "grid");
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(
      AS.HAVE_CLASS,
      "md:grid-cols-2"
    );
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(
      AS.HAVE_CLASS,
      "lg:grid-cols-3"
    );
  });

  it("should be responsive with grid layout", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.HAVE_CLASS, "gap-4");
  });

  it("should not render grid when loading", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={true}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.NOT_EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.LOADING).should(AS.EXIST);
  });

  it("should not render grid when error", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error="Erro de teste"
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.NOT_EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.ERROR).should(AS.EXIST);
  });

  it("should not render grid when empty", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={[]}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID).should(AS.NOT_EXIST);
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.EMPTY).should(AS.EXIST);
  });

  it("should display event information correctly in cards", () => {
    const onEventClickSpy = cy.spy().as("onEventClickSpy");

    cy.mount(
      <EventsList
        events={mockEvents}
        isLoading={false}
        error={null}
        onEventClick={onEventClickSpy}
      />
    );

    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID)
      .find('[data-cy="event-card-title"]')
      .first()
      .should(AS.CONTAIN, "Vendaval");
    cy.getByDataCy(EVENTS_LIST_ELEMENTS.GRID)
      .find('[data-cy="event-card-location"]')
      .first()
      .should(AS.CONTAIN, "Salvador, BA");
  });
});
