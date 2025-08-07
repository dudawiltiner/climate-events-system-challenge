import { AS } from "@utils/enums/assertions.enum";
import ErrorPage from "../ErrorPage";
import { ERROR_PAGE_ELEMENTS } from "../ErrorPage.enum";

describe("<ErrorPage />", () => {
  it("should render the ErrorPage with 404 type", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ICON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(AS.EXIST);
  });

  it("should render the ErrorPage with 500 type", () => {
    cy.mount(<ErrorPage type="500" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ICON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(AS.EXIST);
  });

  it("should render the ErrorPage with network type", () => {
    cy.mount(<ErrorPage type="network" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ICON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(AS.EXIST);
  });

  it("should render the ErrorPage with general type", () => {
    cy.mount(<ErrorPage type="general" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ICON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(AS.EXIST);
  });

  it("should display custom title and description", () => {
    const customTitle = "Erro Personalizado";
    const customDescription = "Esta é uma descrição personalizada do erro";

    cy.mount(
      <ErrorPage
        type="404"
        title={customTitle}
        description={customDescription}
      />
    );

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.CONTAIN, customTitle);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      customDescription
    );
  });

  it("should display error code when provided", () => {
    const errorCode = "ERR-12345";

    cy.mount(<ErrorPage type="500" errorCode={errorCode} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ERROR_CODE).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.ERROR_CODE).should(
      AS.CONTAIN,
      errorCode
    );
  });

  it("should show home and retry buttons by default", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.HOME_BUTTON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.RETRY_BUTTON).should(AS.EXIST);
  });

  it("should hide home button when showHomeButton is false", () => {
    cy.mount(<ErrorPage type="404" showHomeButton={false} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.HOME_BUTTON).should(AS.NOT_EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.RETRY_BUTTON).should(AS.EXIST);
  });

  it("should hide retry button when showRetryButton is false", () => {
    cy.mount(<ErrorPage type="404" showRetryButton={false} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.HOME_BUTTON).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.RETRY_BUTTON).should(AS.NOT_EXIST);
  });

  it("should handle home button click", () => {
    const onGoHomeSpy = cy.spy().as("onGoHomeSpy");

    cy.mount(<ErrorPage type="404" onGoHome={onGoHomeSpy} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.HOME_BUTTON).click();
    cy.get("@onGoHomeSpy").should("have.been.called");
  });

  it("should handle retry button click", () => {
    const onRetrySpy = cy.spy().as("onRetrySpy");

    cy.mount(<ErrorPage type="404" onRetry={onRetrySpy} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.RETRY_BUTTON).click();
    cy.get("@onRetrySpy").should("have.been.called");
  });

  it("should have correct styling classes", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "min-h-screen"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "bg-gray-50"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.HAVE_CLASS, "flex");
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "items-center"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "justify-center"
    );
  });

  it("should apply custom className", () => {
    const customClass = "custom-error-page";

    cy.mount(<ErrorPage type="404" className={customClass} />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      customClass
    );
  });

  it("should display footer information", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.FOOTER).should(AS.EXIST);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.FOOTER).should(
      AS.CONTAIN,
      "entre em contato conosco"
    );
  });

  it("should display correct text for 404 error", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(
      AS.CONTAIN,
      "Página não encontrada"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "não existe"
    );
  });

  it("should display correct text for 500 error", () => {
    cy.mount(<ErrorPage type="500" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(
      AS.CONTAIN,
      "Erro do servidor"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "erro interno"
    );
  });

  it("should display correct text for network error", () => {
    cy.mount(<ErrorPage type="network" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(
      AS.CONTAIN,
      "Erro de conexão"
    );
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "conectar ao servidor"
    );
  });

  it("should display correct text for general error", () => {
    cy.mount(<ErrorPage type="general" />);

    cy.getByDataCy(ERROR_PAGE_ELEMENTS.TITLE).should(AS.CONTAIN, "Erro");
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.DESCRIPTION).should(
      AS.CONTAIN,
      "Algo deu errado"
    );
  });

  it("should be responsive", () => {
    cy.mount(<ErrorPage type="404" />);

    cy.viewport(375, 667);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(768, 1024);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);

    cy.viewport(1280, 720);
    cy.getByDataCy(ERROR_PAGE_ELEMENTS.CONTAINER).should(AS.EXIST);
  });
});
