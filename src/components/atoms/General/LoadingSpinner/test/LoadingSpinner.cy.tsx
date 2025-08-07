import { AS } from "@utils/enums/assertions.enum";
import LoadingSpinner from "../LoadingSpinner";
import { LOADING_SPINNER_ELEMENTS } from "../LoadingSpinner.enum";

describe("<LoadingSpinner />", () => {
  it("should render the LoadingSpinner with default props", () => {
    cy.mount(<LoadingSpinner />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.SPINNER).should(AS.EXIST);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.TEXT).should(AS.EXIST);
  });

  it("should render the LoadingSpinner with different sizes", () => {
    cy.mount(
      <div>
        <LoadingSpinner size="sm" />
        <LoadingSpinner size="md" />
        <LoadingSpinner size="lg" />
      </div>
    );

    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.CONTAINER).should(
      AS.HAVE_LENGTH,
      3
    );
  });

  it("should display custom text", () => {
    cy.mount(<LoadingSpinner text="Custom loading text" />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.TEXT).should(
      AS.CONTAIN,
      "Custom loading text"
    );
  });

  it("should apply custom className", () => {
    cy.mount(<LoadingSpinner className="custom-class" />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "custom-class"
    );
  });

  it("should show spinner animation", () => {
    cy.mount(<LoadingSpinner />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.SPINNER).should(
      AS.HAVE_CLASS,
      "animate-spin"
    );
  });

  it("should display default text when no text prop is provided", () => {
    cy.mount(<LoadingSpinner />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.TEXT).should(
      AS.CONTAIN,
      "Carregando aplicação..."
    );
  });

  it("should render with different size classes", () => {
    cy.mount(<LoadingSpinner size="sm" />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.SPINNER).should(
      AS.HAVE_CLASS,
      "h-4"
    );

    cy.mount(<LoadingSpinner size="md" />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.SPINNER).should(
      AS.HAVE_CLASS,
      "h-8"
    );

    cy.mount(<LoadingSpinner size="lg" />);
    cy.getByDataCy(LOADING_SPINNER_ELEMENTS.SPINNER).should(
      AS.HAVE_CLASS,
      "h-12"
    );
  });
});
