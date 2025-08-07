import { AS } from "@utils/enums/assertions.enum";
import Home from "../Home";
import { HOME_ELEMENTS } from "../Home.enum";

describe("<Home />", () => {
  it("should render the Home screen with all main elements", () => {
    cy.mount(<Home />);

    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.EXIST);
  });

  it("should display EventFilters component", () => {
    cy.mount(<Home />);

    cy.getByDataCy("event-filters").should(AS.EXIST);
  });

  it("should display EventsList component", () => {
    cy.mount(<Home />);

    cy.getByDataCy("events-list").should(AS.EXIST);
  });

  it("should have correct styling classes", () => {
    cy.mount(<Home />);

    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "min-h-screen"
    );
    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "bg-gray-50");
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.HAVE_CLASS, "mx-auto");
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(
      AS.HAVE_CLASS,
      "max-w-7xl"
    );
  });

  it("should be responsive with proper layout", () => {
    cy.mount(<Home />);

    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.HAVE_CLASS, "px-4");
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.HAVE_CLASS, "py-8");
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.HAVE_CLASS, "sm:px-6");
    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT).should(AS.HAVE_CLASS, "lg:px-8");
  });

  it("should have proper spacing between components", () => {
    cy.mount(<Home />);

    cy.getByDataCy(HOME_ELEMENTS.MAIN_CONTENT)
      .find(".space-y-8")
      .should(AS.EXIST);
  });

  it("should handle loading state initially", () => {
    cy.mount(<Home />);

    cy.getByDataCy("loading-spinner-container").should(AS.EXIST);
  });

  it("should handle event click and modal opening", () => {
    cy.mount(<Home />);

    cy.getByDataCy("event-card").first().click();

    cy.getByDataCy("event-modal").should(AS.EXIST);
  });

  it("should handle modal close", () => {
    cy.mount(<Home />);

    cy.getByDataCy("event-card").first().click();
    cy.getByDataCy("event-modal").should(AS.EXIST);

    cy.getByDataCy("event-modal-close").click();

    cy.getByDataCy("event-modal").should(AS.NOT_EXIST);
  });

  it("should pass correct props to EventFilters", () => {
    cy.mount(<Home />);

    cy.getByDataCy("event-filters").should(AS.EXIST);
  });

  it("should pass correct props to EventsList", () => {
    cy.mount(<Home />);

    cy.getByDataCy("events-list").should(AS.EXIST);
  });

  it("should maintain layout on different screen sizes", () => {
    cy.viewport(375, 667);
    cy.mount(<Home />);
    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(768, 1024);
    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(1280, 720);
    cy.getByDataCy(HOME_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display loading spinner during initial mount", () => {
    cy.mount(<Home />);

    cy.getByDataCy("loading-spinner-container").should(AS.EXIST);
  });
});
