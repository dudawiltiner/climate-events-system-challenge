import { AS } from "@utils/enums/assertions.enum";
import {
  EventFilters as EventFiltersType,
  Region,
} from "@utils/types/event.types";
import EventFilters from "../EventFilters";
import { EVENT_FILTERS_ELEMENTS } from "../EventFilters.enum";

const mockFilters: EventFiltersType = {
  tipo: undefined,
  gravidade: undefined,
  local: "",
  regions: [],
};

const mockRegion: Region = {
  lat: -12.9714,
  lng: -38.5011,
  name: "Bahia",
};

describe("<EventFilters />", () => {
  it("should render the EventFilters with all main elements", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.TYPE_SELECT).should(AS.EXIST);
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.SEVERITY_SELECT).should(AS.EXIST);
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.LOCATION_INPUT).should(AS.EXIST);
  });

  it("should display the correct title", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(
      AS.CONTAIN,
      "Filtros"
    );
  });

  it("should handle event type filter changes", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.TYPE_SELECT).select("vendaval", {
      force: true,
    });
    cy.get("@onFiltersChangeSpy").should("have.been.calledWith", {
      tipo: "vendaval",
    });
  });

  it("should handle severity filter changes", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.SEVERITY_SELECT).select("alta", {
      force: true,
    });
    cy.get("@onFiltersChangeSpy").should("have.been.calledWith", {
      gravidade: "alta",
    });
  });

  it("should handle location filter changes", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.LOCATION_INPUT).should(AS.EXIST);

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.LOCATION_INPUT).type("Salvador", {
      force: true,
    });

    cy.get("@onFiltersChangeSpy").should("have.been.called");
  });

  it("should show clear button when has active filters", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={true}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CLEAR_BUTTON).should(AS.EXIST);
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CLEAR_BUTTON).should(
      AS.CONTAIN,
      "Limpar"
    );
  });

  it("should not show clear button when no active filters", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CLEAR_BUTTON).should(AS.NOT_EXIST);
  });

  it("should handle clear filters button click", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={true}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CLEAR_BUTTON).click();
    cy.get("@onClearFiltersSpy").should("have.been.called");
  });

  it("should display selected regions when filters have regions", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    const filtersWithRegions = {
      ...mockFilters,
      regions: [mockRegion],
    };

    cy.mount(
      <EventFilters
        filters={filtersWithRegions}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={true}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(
      AS.CONTAIN,
      "Bahia"
    );
  });

  it("should handle region removal", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    const filtersWithRegions = {
      ...mockFilters,
      regions: [mockRegion],
    };

    cy.mount(
      <EventFilters
        filters={filtersWithRegions}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={true}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.contains("Bahia").parent().find("button").click();
    cy.get("@onRemoveRegionSpy").should("have.been.calledWith", 0);
  });

  it("should have correct styling classes", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "rounded-lg"
    );
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "border"
    );
    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "bg-white"
    );
  });

  it("should be responsive with grid layout", () => {
    const onFiltersChangeSpy = cy.spy().as("onFiltersChangeSpy");
    const onClearFiltersSpy = cy.spy().as("onClearFiltersSpy");
    const onAddRegionSpy = cy.spy().as("onAddRegionSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <EventFilters
        filters={mockFilters}
        onFiltersChange={onFiltersChangeSpy}
        onClearFilters={onClearFiltersSpy}
        hasActiveFilters={false}
        onAddRegion={onAddRegionSpy}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(EVENT_FILTERS_ELEMENTS.CONTAINER)
      .find(".grid")
      .should(AS.HAVE_CLASS, "md:grid-cols-3");
  });
});
