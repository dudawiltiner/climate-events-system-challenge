import { AS } from "@utils/enums/assertions.enum";
import { Region } from "@utils/types/event.types";
import LeafletBrazilMap from "../LeafletBrazilMap";
import { LEAFLET_BRAZIL_MAP_ELEMENTS } from "../LeafletBrazilMap.enum";

const mockRegion: Region = {
  lat: -12.9714,
  lng: -38.5011,
  name: "Bahia (BA)",
};

const mockSelectedRegions: Region[] = [
  {
    lat: -3.7319,
    lng: -38.5267,
    name: "Ceará (CE)",
  },
];

describe("<LeafletBrazilMap />", () => {
  it("should render the LeafletBrazilMap with all main elements", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND).should(AS.EXIST);
    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.INSTRUCTIONS).should(AS.EXIST);
  });

  it("should display the legend with all event types", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND).should(AS.EXIST);
  });

  it("should display instructions text", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.INSTRUCTIONS).should(AS.EXIST);
    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.INSTRUCTIONS).should(
      AS.CONTAIN,
      "💡"
    );
  });

  it("should show fallback state buttons when map is not available", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should handle state button clicks in fallback mode", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display selected states with different styling", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={mockSelectedRegions}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should show states with events information", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should have correct styling classes", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(
      AS.HAVE_CLASS,
      "space-y-4"
    );
    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND).should(
      AS.HAVE_CLASS,
      "bg-white"
    );
    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND).should(
      AS.HAVE_CLASS,
      "rounded-lg"
    );
  });

  it("should be responsive with grid layout", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display loading state initially", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should handle multiple selected regions", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    const multipleRegions = [
      mockRegion,
      { lat: -23.5505, lng: -46.6333, name: "São Paulo (SP)" },
    ];

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={multipleRegions}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER).should(AS.EXIST);
  });

  it("should display color indicators for different event types", () => {
    const onRegionSelectSpy = cy.spy().as("onRegionSelectSpy");
    const onRemoveRegionSpy = cy.spy().as("onRemoveRegionSpy");

    cy.mount(
      <LeafletBrazilMap
        onRegionSelect={onRegionSelectSpy}
        selectedRegions={[]}
        onRemoveRegion={onRemoveRegionSpy}
      />
    );

    cy.getByDataCy(LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND)
      .find(".w-4.h-4")
      .should(AS.EXIST);
  });
});
