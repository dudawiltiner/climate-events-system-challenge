import { defaultDictionary } from "@dictionaries/default-dictionaries";
import { AS } from "@utils/enums/assertions.enum";
import LanguageSelector from "../LanguageSelector";
import { LANGUAGES } from "../LanguageSelector.enum";

const { header } = defaultDictionary["pt-BR"].home;

describe("<LanguageSelector />", () => {
  it("should render the LanguageSelector with all main elements", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.EXIST);
  });

  it("should display language options", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.CONTAIN, "🇧🇷");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.CONTAIN, "🇺🇸");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.CONTAIN, "Português");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.CONTAIN, "English");
  });

  it("should have Portuguese as default selected language", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.HAVE_VALUE, "pt-BR");
  });

  it("should handle language change", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.SELECT).select("en-US");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.HAVE_VALUE, "en-US");
  });

  it("should apply custom className", () => {
    cy.mount(<LanguageSelector className="custom-class" />);
    cy.getByDataCy(LANGUAGES.CONTAINER).should(AS.HAVE_CLASS, "custom-class");
  });

  it("should be focusable", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.SELECT).focus();
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.BE_FOCUSED);
  });

  it("should have correct styling classes", () => {
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.HAVE_CLASS, "border-gray-300");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.HAVE_CLASS, "bg-white");
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.HAVE_CLASS, "rounded-md");
  });

  it("should be responsive", () => {
    cy.viewport(375, 700);
    cy.mount(<LanguageSelector />);
    cy.getByDataCy(LANGUAGES.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(LANGUAGES.SELECT).should(AS.BE_VISIBLE);
  });
});
