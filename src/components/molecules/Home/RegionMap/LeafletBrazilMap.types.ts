import { Region } from "@utils/types/event.types";

export interface LeafletBrazilMapProps {
  onRegionSelect: (region: Region) => void;
  selectedRegions: Array<Region>;
  onRemoveRegion: (index: number) => void;
}

export interface StateWithEvents {
  name: string;
  uf: string;
  lat: number;
  lng: number;
  color: string;
  events: string[];
}
