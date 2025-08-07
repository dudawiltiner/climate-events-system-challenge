import { Langs } from "@dictionaries/default-dictionaries";
import { ClimateEvent, EventFilters } from "@utils/types/event.types";
import { atom } from "jotai";

export const languageAtom = atom<Langs>("pt-BR");

export const eventsAtom = atom<ClimateEvent[]>([]);

export const filtersAtom = atom<EventFilters>({
  tipo: undefined,
  gravidade: undefined,
  local: "",
  regions: [],
});

export const selectedEventAtom = atom<ClimateEvent | null>(null);

const extractStateFromLocation = (location: string): string | null => {
  const stateMatch = location.match(/\b([A-Z]{2})\b/);
  return stateMatch ? stateMatch[1] : null;
};

const getEventCoordinates = (event: ClimateEvent) => {
  const state = extractStateFromLocation(event.local);
  if (!state) return null;

  const stateCoordinates: Record<string, { lat: number; lng: number }> = {
    CE: { lat: -3.7319, lng: -38.5267 },
    SP: { lat: -23.5505, lng: -46.6333 },
    PR: { lat: -25.4289, lng: -49.2671 },
    DF: { lat: -15.7942, lng: -47.8822 },
    PI: { lat: -5.0892, lng: -42.8019 },
    RO: { lat: -8.7619, lng: -63.9039 },
    AM: { lat: -3.119, lng: -60.0217 },
    MG: { lat: -19.9167, lng: -43.9345 },
    RS: { lat: -30.0346, lng: -51.2177 },
    MS: { lat: -20.4486, lng: -54.6295 },
  };

  return stateCoordinates[state] || null;
};

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const filteredEventsAtom = atom((get) => {
  const events = get(eventsAtom);
  const filters = get(filtersAtom);

  return events.filter((event) => {
    if (filters.tipo && event.tipo !== filters.tipo) {
      return false;
    }

    if (filters.gravidade && event.gravidade !== filters.gravidade) {
      return false;
    }

    if (
      filters.local &&
      !event.local.toLowerCase().includes(filters.local.toLowerCase())
    ) {
      return false;
    }

    if (filters.regions && filters.regions.length > 0) {
      const eventCoords = getEventCoordinates(event);
      if (!eventCoords) return false;

      const isInSelectedRegion = filters.regions.some((region) => {
        const distance = calculateDistance(
          eventCoords.lat,
          eventCoords.lng,
          region.lat,
          region.lng
        );
        return distance <= 300;
      });

      if (!isInSelectedRegion) {
        return false;
      }
    }

    return true;
  });
});
