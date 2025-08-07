import { AS } from "@utils/enums/assertions.enum";
import Button from "../Button";
import { BUTTON_ELEMENTS } from "../Button.enum";

describe("<Button />", () => {
  it("should render the Button with default props", () => {
    cy.mount(<Button>Click me</Button>);
    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.EXIST);
    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.BE_VISIBLE);
    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.CONTAIN, "Click me");
  });

  it("should render the Button with different variants", () => {
    cy.mount(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    );

    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.HAVE_LENGTH, 4);
  });

  it("should render the Button with different sizes", () => {
    cy.mount(
      <div>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    );

    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.HAVE_LENGTH, 3);
  });

  it("should handle click events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Button onClick={onClickSpy}>Click me</Button>);

    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });

  it("should be disabled when disabled prop is true", () => {
    cy.mount(<Button disabled>Disabled Button</Button>);
    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.BE_DISABLED);
  });

  it("should render with left and right icons", () => {
    cy.mount(
      <Button
        leftIcon={<span data-cy="left-icon">←</span>}
        rightIcon={<span data-cy="right-icon">→</span>}
      >
        With Icons
      </Button>
    );

    cy.getByDataCy(BUTTON_ELEMENTS.BUTTON).should(AS.EXIST);
    cy.getByDataCy("left-icon").should(AS.EXIST);
    cy.getByDataCy("right-icon").should(AS.EXIST);
  });
});
