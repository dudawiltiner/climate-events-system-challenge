import { ClimateEvent } from "@utils/types/event.types";

export interface EventCardProps {
  event: ClimateEvent;
  onClick: (event: ClimateEvent) => void;
}
