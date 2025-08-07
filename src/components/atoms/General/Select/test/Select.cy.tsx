import { AS } from "@utils/enums/assertions.enum";
import Select from "../Select";
import { SELECT_ELEMENTS } from "../Select.enum";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("<Select />", () => {
  it("should render the Select with default props", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        placeholder="Select an option"
      />
    );
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(AS.EXIST);
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(AS.BE_VISIBLE);
  });

  it("should render the Select with label", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        label="Choose option"
        options={mockOptions}
        onChange={onChangeSpy}
        placeholder="Select an option"
      />
    );
    cy.getByDataCy(SELECT_ELEMENTS.LABEL).should(AS.EXIST);
    cy.getByDataCy(SELECT_ELEMENTS.LABEL).should(AS.CONTAIN, "Choose option");
  });

  it("should handle value changes", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        placeholder="Select an option"
      />
    );

    cy.getByDataCy(SELECT_ELEMENTS.SELECT).select("option2");
    cy.get("@onChangeSpy").should("have.been.calledWith", "option2");
  });

  it("should be disabled when disabled prop is true", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        disabled
        placeholder="Disabled select"
      />
    );
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(AS.BE_DISABLED);
  });

  it("should show error state", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        error="This field is required"
        placeholder="Error select"
      />
    );
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(
      AS.HAVE_CLASS,
      "border-red-500"
    );
  });

  it("should display all options", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        placeholder="Select an option"
      />
    );

    mockOptions.forEach((option) => {
      cy.getByDataCy(SELECT_ELEMENTS.SELECT)
        .find(`option[value="${option.value}"]`)
        .should(AS.EXIST);
      cy.getByDataCy(SELECT_ELEMENTS.SELECT)
        .find(`option[value="${option.value}"]`)
        .should(AS.CONTAIN, option.label);
    });
  });

  it("should handle empty options array", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select options={[]} onChange={onChangeSpy} placeholder="No options" />
    );
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(AS.EXIST);
  });

  it("should be focusable", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Select
        options={mockOptions}
        onChange={onChangeSpy}
        placeholder="Focusable select"
      />
    );
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).focus();
    cy.getByDataCy(SELECT_ELEMENTS.SELECT).should(AS.BE_FOCUSED);
  });
});
