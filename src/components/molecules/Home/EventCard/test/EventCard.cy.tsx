import { AS } from "@utils/enums/assertions.enum";
import { ClimateEvent } from "@utils/types/event.types";
import EventCard from "../EventCard";
import { EVENT_CARD_ELEMENTS } from "../EventCard.enum";

const mockEvent: ClimateEvent = {
  id: "1",
  tipo: "vendaval",
  gravidade: "média",
  local: "Salvador, BA",
  inicio: "2025-07-30T10:00:00Z",
  fim: "2025-08-01T18:00:00Z",
  descricao:
    "Vendaval com ventos fortes e chuvas intensas na região de Salvador.",
};

const mockActiveEvent: ClimateEvent = {
  ...mockEvent,
  id: "2",
  inicio: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  fim: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
};

describe("<EventCard />", () => {
  it("should render the EventCard with all main elements", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.LOCATION).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.DESCRIPTION).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.DATE_RANGE).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.SEVERITY_BADGE).should(AS.EXIST);
  });

  it("should display event information correctly", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.TITLE).should(AS.CONTAIN, "Vendaval");
    cy.getByDataCy(EVENT_CARD_ELEMENTS.LOCATION).should(
      AS.CONTAIN,
      "Salvador, BA"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "Vendaval com ventos fortes"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.SEVERITY_BADGE).should(
      AS.CONTAIN,
      "Média"
    );
  });

  it("should handle click events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).click();
    cy.get("@onClickSpy").should("have.been.calledWith", mockEvent);
  });

  it("should handle keyboard events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).focus();
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).type("{enter}");
    cy.get("@onClickSpy").should("have.been.calledWith", mockEvent);
  });

  it("should show active status indicator for active events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockActiveEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.STATUS_INDICATOR).should(AS.EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(AS.HAVE_CLASS, "ring-2");
  });

  it("should not show active status indicator for inactive events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.STATUS_INDICATOR).should(AS.NOT_EXIST);
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(
      AS.NOT_HAVE_CLASS,
      "ring-2"
    );
  });

  it("should display active event message for active events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockActiveEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(AS.CONTAIN, "Evento Ativo");
  });

  it("should be focusable and accessible", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(
      AS.HAVE_ATTR,
      "role",
      "button"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(
      AS.HAVE_ATTR,
      "tabindex",
      "0"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).focus();
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(AS.BE_FOCUSED);
  });

  it("should have correct styling classes", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<EventCard event={mockEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(
      AS.HAVE_CLASS,
      "cursor-pointer"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(
      AS.HAVE_CLASS,
      "rounded-lg"
    );
    cy.getByDataCy(EVENT_CARD_ELEMENTS.CARD).should(AS.HAVE_CLASS, "border-2");
  });

  it("should display different event types correctly", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    const floodEvent = {
      ...mockEvent,
      tipo: "enchente" as const,
      gravidade: "alta" as const,
    };
    cy.mount(<EventCard event={floodEvent} onClick={onClickSpy} />);

    cy.getByDataCy(EVENT_CARD_ELEMENTS.TITLE).should(AS.CONTAIN, "Enchente");
    cy.getByDataCy(EVENT_CARD_ELEMENTS.SEVERITY_BADGE).should(
      AS.CONTAIN,
      "Alta"
    );
  });
});
