import { ClimateEvent } from "@utils/types/event.types";

export interface EventModalProps {
  event: ClimateEvent | null;
  isOpen: boolean;
  onClose: () => void;
}
