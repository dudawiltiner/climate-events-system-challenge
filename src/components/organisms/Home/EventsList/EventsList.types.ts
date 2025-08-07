import { ClimateEvent } from "@utils/types/event.types";

export interface EventsListProps {
  events: ClimateEvent[];
  isLoading: boolean;
  error: string | null;
  onEventClick: (event: ClimateEvent) => void;
}
