import { AS } from "@utils/enums/assertions.enum";
import Badge from "../Badge";
import { BADGE_ELEMENTS } from "../Badge.enum";

describe("<Badge />", () => {
  it("should render the Badge with default props", () => {
    cy.mount(<Badge>Default Badge</Badge>);
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.EXIST);
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.BE_VISIBLE);
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.CONTAIN, "Default Badge");
  });

  it("should render the Badge with different variants", () => {
    cy.mount(
      <div>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
    );

    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.HAVE_LENGTH, 4);
  });

  it("should render the Badge with different sizes", () => {
    cy.mount(
      <div>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    );

    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.HAVE_LENGTH, 3);
  });

  it("should apply custom className", () => {
    cy.mount(<Badge className="custom-class">Custom Badge</Badge>);
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.HAVE_CLASS, "custom-class");
  });

  it("should handle click events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Badge onClick={onClickSpy}>Clickable Badge</Badge>);

    cy.getByDataCy(BADGE_ELEMENTS.BADGE).click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });

  it("should render with different content types", () => {
    cy.mount(
      <div>
        <Badge>Text Badge</Badge>
        <Badge>123</Badge>
        <Badge>🚀</Badge>
      </div>
    );

    cy.getByDataCy(BADGE_ELEMENTS.BADGE).should(AS.HAVE_LENGTH, 3);
    cy.getByDataCy(BADGE_ELEMENTS.BADGE)
      .first()
      .should(AS.CONTAIN, "Text Badge");
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).eq(1).should(AS.CONTAIN, "123");
    cy.getByDataCy(BADGE_ELEMENTS.BADGE).last().should(AS.CONTAIN, "🚀");
  });
});
