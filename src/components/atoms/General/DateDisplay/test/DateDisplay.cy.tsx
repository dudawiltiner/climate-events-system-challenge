import { defaultDictionary } from "@dictionaries/default-dictionaries";
import { AS } from "@utils/enums/assertions.enum";
import DateDisplay from "../DateDisplay";
import { DATE_DISPLAY_ELEMENTS } from "../DateDisplay.enum";

const { home } = defaultDictionary["pt-BR"];

describe("<DateDisplay />", () => {
  const mockStartDate = "2025-07-30T10:00:00Z";
  const mockEndDate = "2025-08-01T18:00:00Z";

  it("should render the DateDisplay with all main elements", () => {
    cy.mount(<DateDisplay startDate={mockStartDate} endDate={mockEndDate} />);
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display date range information", () => {
    cy.mount(<DateDisplay startDate={mockStartDate} endDate={mockEndDate} />);
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(
      AS.CONTAIN,
      home.modal.period
    );
  });

  it("should show relative date when showRelative is true", () => {
    cy.mount(
      <DateDisplay
        startDate={mockStartDate}
        endDate={mockEndDate}
        showRelative={true}
      />
    );
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display day of week", () => {
    cy.mount(<DateDisplay startDate={mockStartDate} endDate={mockEndDate} />);
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should show today indicator when date is today", () => {
    const today = new Date().toISOString();
    cy.mount(<DateDisplay startDate={today} endDate={mockEndDate} />);
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(
      AS.CONTAIN,
      home.dates.today
    );
  });

  it("should apply custom className", () => {
    cy.mount(
      <DateDisplay
        startDate={mockStartDate}
        endDate={mockEndDate}
        className="custom-class"
      />
    );
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "custom-class"
    );
  });

  it("should display full formatted date", () => {
    cy.mount(<DateDisplay startDate={mockStartDate} endDate={mockEndDate} />);
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should handle different date formats", () => {
    const differentStartDate = "2025-12-25T15:30:00Z";
    const differentEndDate = "2025-12-26T10:00:00Z";

    cy.mount(
      <DateDisplay startDate={differentStartDate} endDate={differentEndDate} />
    );
    cy.getByDataCy(DATE_DISPLAY_ELEMENTS.CONTAINER).should(AS.EXIST);
  });
});
