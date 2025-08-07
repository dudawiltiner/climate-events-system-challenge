"use client";

import { useLanguage } from "@hooks/useLanguage";
import EventCard from "@molecules/Home/EventCard/EventCard";
import { AlertTriangle, Loader2 } from "lucide-react";
import { EVENTS_LIST_ELEMENTS } from "./EventsList.enum";
import { EventsListProps } from "./EventsList.types";

const EventsList = ({
  events,
  isLoading,
  error,
  onEventClick,
}: EventsListProps) => {
  const { dictionary } = useLanguage();

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-cy={EVENTS_LIST_ELEMENTS.LOADING}
      >
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{dictionary.home.events.loading}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-cy={EVENTS_LIST_ELEMENTS.ERROR}
      >
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle className="h-6 w-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-cy={EVENTS_LIST_ELEMENTS.EMPTY}
      >
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {dictionary.home.events.empty.title}
          </h3>
          <p className="mt-2 text-gray-600">
            {dictionary.home.events.empty.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-cy={EVENTS_LIST_ELEMENTS.CONTAINER}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {dictionary.home.events.title}
        </h2>
        <span
          className="text-sm text-gray-600"
          data-cy={EVENTS_LIST_ELEMENTS.COUNT}
        >
          {events.length}{" "}
          {events.length === 1
            ? dictionary.home.events.count.one
            : dictionary.home.events.count.many}
        </span>
      </div>

      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-cy={EVENTS_LIST_ELEMENTS.GRID}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} onClick={onEventClick} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
