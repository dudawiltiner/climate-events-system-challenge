import { filteredEventsAtom, filtersAtom } from "@context/events.store";
import { EventFilters, Region } from "@utils/types/event.types";
import { useAtom } from "jotai";

export const useEventFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [filteredEvents] = useAtom(filteredEventsAtom);

  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      tipo: undefined,
      gravidade: undefined,
      local: "",
      regions: [],
    });
  };

  const addRegion = (region: Region) => {
    setFilters((prev) => ({
      ...prev,
      regions: [...(prev.regions || []), region],
    }));
  };

  const removeRegion = (index: number) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions?.filter((_, i) => i !== index) || [],
    }));
  };

  const clearRegions = () => {
    setFilters((prev) => ({
      ...prev,
      regions: [],
    }));
  };

  const hasActiveFilters =
    filters.tipo !== undefined ||
    filters.gravidade !== undefined ||
    filters.local !== "" ||
    (filters.regions && filters.regions.length > 0);

  return {
    filters,
    filteredEvents,
    updateFilters,
    clearFilters,
    addRegion,
    removeRegion,
    clearRegions,
    hasActiveFilters,
  };
};
