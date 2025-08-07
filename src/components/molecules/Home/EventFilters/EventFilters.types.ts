import {
  EventFilters as EventFiltersType,
  Region,
} from "@utils/types/event.types";

export interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: Partial<EventFiltersType>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  onAddRegion: (region: Region) => void;
  onRemoveRegion: (index: number) => void;
}
