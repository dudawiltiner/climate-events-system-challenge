import { AS } from "@utils/enums/assertions.enum";
import HomeWrapper from "../HomeWrapper";
import { HOME_WRAPPER_ELEMENTS } from "../HomeWrapper.enum";

describe("<HomeWrapper />", () => {
  it("should render the HomeWrapper with all main elements", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display loading spinner with correct text", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy("loading-spinner-container").should(AS.EXIST);
    cy.getByDataCy("loading-spinner-text").should(AS.CONTAIN, "Carregando");
  });

  it("should apply custom className prop", () => {
    const customClassName = "custom-wrapper-class";
    cy.mount(<HomeWrapper className={customClassName} />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      customClassName
    );
  });

  it("should render Home component after mounting", () => {
    cy.mount(<HomeWrapper />);

    cy.wait(100);

    cy.getByDataCy("home").should(AS.EXIST);
  });

  it("should handle empty className prop", () => {
    cy.mount(<HomeWrapper className="" />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should handle undefined className prop", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should have proper loading spinner size", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy("loading-spinner-container").should(AS.EXIST);
    cy.getByDataCy("loading-spinner-spinner").should(AS.EXIST);
  });

  it("should maintain layout on different screen sizes", () => {
    cy.viewport(375, 667);
    cy.mount(<HomeWrapper />);
    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(768, 1024);
    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(1280, 720);
    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should have proper semantic HTML structure", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should handle multiple className props", () => {
    const multipleClasses = "class1 class2 class3";
    cy.mount(<HomeWrapper className={multipleClasses} />);

    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "class1"
    );
    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "class2"
    );
    cy.getByDataCy(HOME_WRAPPER_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "class3"
    );
  });

  it("should display loading text from dictionary", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy("loading-spinner-text").should(AS.CONTAIN, "Carregando");
  });

  it("should have proper loading spinner styling", () => {
    cy.mount(<HomeWrapper />);

    cy.getByDataCy("loading-spinner-container").should(AS.EXIST);
    cy.getByDataCy("loading-spinner-spinner").should(AS.EXIST);
  });
});
