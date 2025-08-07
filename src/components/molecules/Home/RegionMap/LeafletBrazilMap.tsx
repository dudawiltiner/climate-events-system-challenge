"use client";

import { useLanguage } from "@hooks/useLanguage";
import { useEffect, useState } from "react";
import { LEAFLET_BRAZIL_MAP_ELEMENTS } from "./LeafletBrazilMap.enum";
import {
  LeafletBrazilMapProps,
  StateWithEvents,
} from "./LeafletBrazilMap.types";

const statesWithEvents: StateWithEvents[] = [
  {
    name: "Ceará",
    uf: "CE",
    lat: -3.7319,
    lng: -38.5267,
    color: "#ef4444",
    events: ["onda_de_calor"],
  },
  {
    name: "São Paulo",
    uf: "SP",
    lat: -23.5505,
    lng: -46.6333,
    color: "#3b82f6",
    events: ["enchente"],
  },
  {
    name: "Paraná",
    uf: "PR",
    lat: -25.4289,
    lng: -49.2671,
    color: "#10b981",
    events: ["vendaval"],
  },
  {
    name: "Distrito Federal",
    uf: "DF",
    lat: -15.7942,
    lng: -47.8822,
    color: "#eab308",
    events: ["incendio"],
  },
  {
    name: "Piauí",
    uf: "PI",
    lat: -5.0892,
    lng: -42.8019,
    color: "#ef4444",
    events: ["onda_de_calor"],
  },
  {
    name: "Rondônia",
    uf: "RO",
    lat: -8.7619,
    lng: -63.9039,
    color: "#a855f7",
    events: ["queimada"],
  },
  {
    name: "Amazonas",
    uf: "AM",
    lat: -3.119,
    lng: -60.0217,
    color: "#3b82f6",
    events: ["enchente"],
  },
  {
    name: "Minas Gerais",
    uf: "MG",
    lat: -19.9167,
    lng: -43.9345,
    color: "#6366f1",
    events: ["projecao_carga_energia"],
  },
  {
    name: "Rio Grande do Sul",
    uf: "RS",
    lat: -30.0346,
    lng: -51.2177,
    color: "#10b981",
    events: ["vendaval"],
  },
  {
    name: "Mato Grosso do Sul",
    uf: "MS",
    lat: -20.4486,
    lng: -54.6295,
    color: "#a855f7",
    events: ["queimada"],
  },
];

const LeafletBrazilMap = ({
  onRegionSelect,
  selectedRegions,
  onRemoveRegion,
}: LeafletBrazilMapProps) => {
  const { dictionary } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [Circle, setCircle] = useState<any>(null);
  const [LayerGroup, setLayerGroup] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    const loadLeaflet = async () => {
      try {
        const {
          MapContainer: MC,
          TileLayer: TL,
          Popup: P,
          Circle: C,
          LayerGroup: LG,
        } = await import("react-leaflet");

        setMapContainer(MC);
        setTileLayer(TL);
        setPopup(P);
        setCircle(C);
        setLayerGroup(LG);
        setLeafletLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar Leaflet:", error);
        setLeafletLoaded(false);
      }
    };

    loadLeaflet();
  }, []);

  const handleStateClick = (state: StateWithEvents) => {
    onRegionSelect({
      lat: state.lat,
      lng: state.lng,
      name: `${state.name} (${state.uf})`,
    });
  };

  const formatEventNames = (events: string[]) => {
    return events
      .map(
        (event) =>
          dictionary.home.eventTypes[
            event as keyof typeof dictionary.home.eventTypes
          ] || event
      )
      .join(", ");
  };

  if (!mounted) {
    return (
      <div
        className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-300 flex items-center justify-center"
        data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER}
      >
        <div className="text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <div>{dictionary.home.map.loading}</div>
        </div>
      </div>
    );
  }

  if (
    !leafletLoaded ||
    !MapContainer ||
    !TileLayer ||
    !Popup ||
    !Circle ||
    !LayerGroup
  ) {
    return (
      <div
        className="space-y-4"
        data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.FALLBACK_CONTAINER}
      >
        <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">⚠️</div>
            <div className="text-gray-700 font-medium mb-2">
              {dictionary.home.map.unavailable}
            </div>
            <div className="text-gray-500 text-sm">
              {dictionary.home.map.fallbackDescription}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">
            {dictionary.home.map.statesWithEvents}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {statesWithEvents.map((state, index) => (
              <button
                key={index}
                onClick={() => handleStateClick(state)}
                className={`
                  p-2 rounded text-left text-sm font-medium transition-colors
                  ${
                    selectedRegions.some((r) => r.name.includes(state.uf))
                      ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent"
                  }
                `}
                data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.FALLBACK_STATE_BUTTON}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: state.color }}
                  ></div>
                  <span>
                    {state.name} ({state.uf})
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatEventNames(state.events)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const brazilCenter: [number, number] = [-15.7942, -47.8822];

  return (
    <div className="space-y-4" data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.CONTAINER}>
      <div
        className="h-80 rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg"
        data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.MAP_CONTAINER}
      >
        <MapContainer
          center={brazilCenter}
          zoom={4}
          className="h-full w-full"
          scrollWheelZoom={false}
          style={{ background: "#f0f9ff" }}
          minZoom={3}
          maxZoom={8}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.9}
          />

          <LayerGroup>
            {statesWithEvents.map((state, index) => {
              const isSelected = selectedRegions.some((r) =>
                r.name.includes(state.uf)
              );

              return (
                <Circle
                  key={index}
                  center={[state.lat, state.lng]}
                  radius={isSelected ? 100000 : 80000}
                  pathOptions={{
                    color: state.color,
                    fillColor: state.color,
                    fillOpacity: isSelected ? 0.7 : 0.5,
                    weight: isSelected ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => handleStateClick(state),
                  }}
                  data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.STATE_CIRCLE}
                >
                  <Popup data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.POPUP}>
                    <div className="text-center p-2">
                      <div className="font-bold text-lg text-gray-800">
                        {state.name}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        ({state.uf})
                      </div>
                      <div className="text-xs text-gray-500">
                        Evento: {formatEventNames(state.events)}
                      </div>
                    </div>
                  </Popup>
                </Circle>
              );
            })}
          </LayerGroup>
        </MapContainer>
      </div>

      <div
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
        data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.LEGEND}
      >
        <h4 className="font-semibold text-gray-800 mb-3">
          {dictionary.home.map.legend.title}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.onda_de_calor}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.enchente}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.vendaval}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.incendio}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.queimada}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700 font-medium">
              {dictionary.home.map.legend.projecao_carga_energia}
            </span>
          </div>
        </div>
      </div>

      <div
        className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600"
        data-cy={LEAFLET_BRAZIL_MAP_ELEMENTS.INSTRUCTIONS}
      >
        💡 {dictionary.home.filters.regionFilter.instructions}
      </div>
    </div>
  );
};

export default LeafletBrazilMap;
