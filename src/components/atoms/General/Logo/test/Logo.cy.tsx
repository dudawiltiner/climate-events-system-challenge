import { AS } from "@utils/enums/assertions.enum";
import Logo from "../Logo";
import { LOGO_ELEMENTS } from "../Logo.enum";

describe("<Logo />", () => {
  it("should render the Logo with default props", () => {
    cy.mount(<Logo />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(LOGO_ELEMENTS.TEXT).should(AS.EXIST);
    cy.getByDataCy(LOGO_ELEMENTS.TEXT).should(AS.CONTAIN, "i4sea");
  });

  it("should render the Logo with different sizes", () => {
    cy.mount(
      <div>
        <Logo size="sm" />
        <Logo size="md" />
        <Logo size="lg" />
      </div>
    );

    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_LENGTH, 3);
  });

  it("should apply custom className", () => {
    cy.mount(<Logo className="custom-class" />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "custom-class"
    );
  });

  it("should have correct styling classes", () => {
    cy.mount(<Logo />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "bg-blue-600"
    );
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "text-white");
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "font-bold");
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "rounded-lg");
  });

  it("should display the correct text content", () => {
    cy.mount(<Logo />);
    cy.getByDataCy(LOGO_ELEMENTS.TEXT).should(AS.CONTAIN, "i4sea");
    cy.getByDataCy(LOGO_ELEMENTS.TEXT).should(AS.HAVE_CLASS, "font-mono");
  });

  it("should render with different size dimensions", () => {
    cy.mount(<Logo size="sm" />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "h-8");

    cy.mount(<Logo size="md" />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "h-12");

    cy.mount(<Logo size="lg" />);
    cy.getByDataCy(LOGO_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "h-16");
  });
});
