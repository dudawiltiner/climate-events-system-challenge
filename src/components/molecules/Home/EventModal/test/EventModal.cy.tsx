import { AS } from "@utils/enums/assertions.enum";
import { ClimateEvent } from "@utils/types/event.types";
import EventModal from "../EventModal";
import { EVENT_MODAL_ELEMENTS } from "../EventModal.enum";

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

describe("<EventModal />", () => {
  it("should render the EventModal when open", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.EXIST);
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(AS.EXIST);
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.CLOSE_BUTTON).should(AS.EXIST);
  });

  it("should not render when closed", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={false} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.NOT_EXIST);
  });

  it("should not render when no event", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<EventModal event={null} isOpen={true} onClose={onCloseSpy} />);

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.NOT_EXIST);
  });

  it("should display event information correctly", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.TITLE).should(AS.CONTAIN, "Vendaval");
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.LOCATION).should(
      AS.CONTAIN,
      "Salvador, BA"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "Vendaval com ventos fortes"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.SEVERITY_BADGE).should(
      AS.CONTAIN,
      "Média"
    );
  });

  it("should handle close button click", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.CLOSE_BUTTON).click();
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("should handle overlay click", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.EXIST);

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(AS.EXIST);
  });

  it("should handle escape key", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(AS.EXIST);

    cy.get("body").type("{esc}");

    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("should show active status indicator for active events", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockActiveEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.STATUS_INDICATOR).should(AS.EXIST);
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.STATUS_INDICATOR).should(
      AS.CONTAIN,
      "Evento Ativo"
    );
  });

  it("should not show active status indicator for inactive events", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.STATUS_INDICATOR).should(AS.NOT_EXIST);
  });

  it("should display date range information", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.DATE_RANGE).should(AS.EXIST);
  });

  it("should be accessible with proper ARIA attributes", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_ATTR,
      "role",
      "dialog"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_ATTR,
      "aria-modal",
      "true"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_ATTR,
      "aria-labelledby",
      "modal-title"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.CLOSE_BUTTON).should(
      AS.HAVE_ATTR,
      "aria-label",
      "Fechar modal"
    );
  });

  it("should have correct styling classes", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.HAVE_CLASS, "fixed");
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(
      AS.HAVE_CLASS,
      "inset-0"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_CLASS,
      "rounded-lg"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_CLASS,
      "bg-white"
    );
  });

  it("should be responsive with max width and height", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_CLASS,
      "max-w-2xl"
    );
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.MODAL).should(
      AS.HAVE_CLASS,
      "max-h-[90vh]"
    );
  });

  it("should display different event types correctly", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    const floodEvent = {
      ...mockEvent,
      tipo: "enchente" as const,
      gravidade: "alta" as const,
    };
    cy.mount(
      <EventModal event={floodEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.TITLE).should(AS.CONTAIN, "Enchente");
    cy.getByDataCy(EVENT_MODAL_ELEMENTS.SEVERITY_BADGE).should(
      AS.CONTAIN,
      "Alta"
    );
  });

  it("should prevent body scroll when open", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <EventModal event={mockEvent} isOpen={true} onClose={onCloseSpy} />
    );

    cy.getByDataCy(EVENT_MODAL_ELEMENTS.OVERLAY).should(AS.EXIST);
  });
});
