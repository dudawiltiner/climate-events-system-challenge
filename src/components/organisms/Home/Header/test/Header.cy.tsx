import { defaultDictionary } from "@dictionaries/default-dictionaries";
import { AS } from "@utils/enums/assertions.enum";
import Header from "../Header";
import { HEADER_ELEMENTS } from "../Header.enum";

const { header } = defaultDictionary["pt-BR"].home;

describe("<Header />", () => {
  it("should render the Header with all main elements on desktop", () => {
    cy.viewport(1280, 800);
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.SUBTITLE).should(AS.EXIST);
  });

  it("should render the Header responsively on mobile", () => {
    cy.viewport(375, 700);
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.SUBTITLE).should(AS.EXIST);
  });

  it("should display the correct texts from the dictionary", () => {
    cy.mount(<Header />);
    cy.contains(header.title).should(AS.EXIST);
    cy.contains(header.subtitle).should(AS.EXIST);
    cy.contains(header.systemStatus).should(AS.EXIST);
  });

  it("should include language selector", () => {
    cy.mount(<Header />);
    cy.getByDataCy("language-selector-container").should(AS.EXIST);
    cy.getByDataCy("language-selector-select").should(AS.EXIST);
  });

  it("should have correct styling classes", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.HAVE_CLASS, "bg-white");
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.HAVE_CLASS, "shadow-sm");
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.HAVE_CLASS, "border-b");
  });

  it("should be responsive with proper layout", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).find(".flex").should(AS.EXIST);
  });

  it("should display logo with correct styling", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.HAVE_CLASS, "h-12");
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.HAVE_CLASS, "w-32");
  });

  it("should display title with correct styling", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.HAVE_CLASS, "text-xl");
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.HAVE_CLASS, "font-bold");
  });

  it("should display subtitle with correct styling", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.SUBTITLE).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.SUBTITLE).should(AS.HAVE_CLASS, "text-xs");
    cy.getByDataCy(HEADER_ELEMENTS.SUBTITLE).should(
      AS.HAVE_CLASS,
      "text-gray-600"
    );
  });

  it("should handle language selector interaction", () => {
    cy.mount(<Header />);
    cy.getByDataCy("language-selector-select").should(AS.EXIST);
    cy.getByDataCy("language-selector-select").should(AS.BE_VISIBLE);
  });

  it("should maintain layout on different screen sizes", () => {
    cy.viewport(768, 1024);
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.EXIST);

    cy.viewport(1920, 1080);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.LOGO).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.TITLE).should(AS.EXIST);
  });

  it("should have proper spacing and padding", () => {
    cy.mount(<Header />);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).should(AS.EXIST);
    cy.getByDataCy(HEADER_ELEMENTS.HEADER).find(".px-4").should(AS.EXIST);
  });

  it("should display system status information", () => {
    cy.mount(<Header />);
    cy.contains(header.systemStatus).should(AS.EXIST);
  });
});
