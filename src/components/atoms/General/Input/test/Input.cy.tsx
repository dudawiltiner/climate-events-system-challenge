import { AS } from "@utils/enums/assertions.enum";
import Input from "../Input";
import { INPUT_ELEMENTS } from "../Input.enum";

describe("<Input />", () => {
  it("should render the Input with default props", () => {
    cy.mount(<Input placeholder="Enter text" />);
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.EXIST);
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.BE_VISIBLE);
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(
      AS.HAVE_ATTR,
      "placeholder",
      "Enter text"
    );
  });

  it("should render the Input with label", () => {
    cy.mount(<Input label="Username" placeholder="Enter username" />);
    cy.getByDataCy(INPUT_ELEMENTS.LABEL).should(AS.EXIST);
    cy.getByDataCy(INPUT_ELEMENTS.LABEL).should(AS.CONTAIN, "Username");
  });

  it("should handle value changes", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Input onChange={onChangeSpy} placeholder="Type here" />);

    cy.getByDataCy(INPUT_ELEMENTS.INPUT).type("Hello World");
    cy.get("@onChangeSpy").should("have.been.called");
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.HAVE_VALUE, "Hello World");
  });

  it("should be disabled when disabled prop is true", () => {
    cy.mount(<Input disabled placeholder="Disabled input" />);
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.BE_DISABLED);
  });

  it("should show error state", () => {
    cy.mount(
      <Input error="This field is required" placeholder="Error input" />
    );
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(
      AS.HAVE_CLASS,
      "border-red-500"
    );
  });

  it("should handle different input types", () => {
    cy.mount(
      <div>
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="number" placeholder="Number input" />
      </div>
    );

    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.HAVE_LENGTH, 4);
  });

  it("should be focusable", () => {
    cy.mount(<Input placeholder="Focusable input" />);
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).focus();
    cy.getByDataCy(INPUT_ELEMENTS.INPUT).should(AS.BE_FOCUSED);
  });
});
