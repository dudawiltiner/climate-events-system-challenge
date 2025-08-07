"use client";

import Button from "@atoms/General/Button/Button";
import Input from "@atoms/General/Input/Input";
import Select from "@atoms/General/Select/Select";
import { useLanguage } from "@hooks/useLanguage";
import { Region } from "@utils/types/event.types";
import { MapPin, X } from "lucide-react";
import LeafletBrazilMap from "../RegionMap";
import { EVENT_FILTERS_ELEMENTS } from "./EventFilters.enum";
import { EventFiltersProps } from "./EventFilters.types";

const EventFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  onAddRegion,
  onRemoveRegion,
}: EventFiltersProps) => {
  const { dictionary } = useLanguage();

  const eventTypeOptions = [
    { value: "", label: dictionary.home.filters.eventType.placeholder },
    ...Object.entries(dictionary.home.eventTypes).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  const severityOptions = [
    { value: "", label: dictionary.home.filters.severity.placeholder },
    ...Object.entries(dictionary.home.severity).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  const handleRegionSelect = (region: Region) => {
    onAddRegion(region);
  };

  const handleRemoveRegion = (index: number) => {
    onRemoveRegion(index);
  };

  return (
    <div
      className="space-y-4 rounded-lg border bg-white p-4 shadow-sm"
      data-cy={EVENT_FILTERS_ELEMENTS.CONTAINER}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {dictionary.home.filters.title}
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            leftIcon={<X className="h-4 w-4" />}
            data-cy={EVENT_FILTERS_ELEMENTS.CLEAR_BUTTON}
          >
            {dictionary.home.filters.clearButton}
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select
          label={dictionary.home.filters.eventType.label}
          options={eventTypeOptions}
          value={filters.tipo || ""}
          onChange={(value) => onFiltersChange({ tipo: value as any })}
          data-cy={EVENT_FILTERS_ELEMENTS.TYPE_SELECT}
        />

        <Select
          label={dictionary.home.filters.severity.label}
          options={severityOptions}
          value={filters.gravidade || ""}
          onChange={(value) => onFiltersChange({ gravidade: value as any })}
          data-cy={EVENT_FILTERS_ELEMENTS.SEVERITY_SELECT}
        />

        <Input
          label={dictionary.home.filters.location.label}
          placeholder={dictionary.home.filters.location.placeholder}
          value={filters.local || ""}
          onChange={(e) => onFiltersChange({ local: e.target.value })}
          data-cy={EVENT_FILTERS_ELEMENTS.LOCATION_INPUT}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <h3 className="text-md font-medium text-gray-900">
            {dictionary.home.filters.regionFilter.title}
          </h3>
        </div>

        {filters.regions && filters.regions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              {dictionary.home.filters.regionFilter.selectedStates}
            </h4>
            <div className="flex flex-wrap gap-2">
              {filters.regions.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span>{region.name}</span>
                  <button
                    onClick={() => handleRemoveRegion(index)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <LeafletBrazilMap
            onRegionSelect={handleRegionSelect}
            selectedRegions={filters.regions || []}
            onRemoveRegion={handleRemoveRegion}
          />
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
