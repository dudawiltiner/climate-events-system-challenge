"use client";

import {
  EVENT_TYPE_COLORS,
  SEVERITY_COLORS,
} from "@constants/events.constants";
import { formatDateRange, isEventActive } from "@functions/date.utils";
import { useLanguage } from "@hooks/useLanguage";
import { cn } from "@styles/utils";
import { AlertCircle, Clock, MapPin } from "lucide-react";
import { EVENT_CARD_ELEMENTS } from "./EventCard.enum";
import { EventCardProps } from "./EventCard.types";

const EventCard = ({ event, onClick }: EventCardProps) => {
  const { dictionary, language } = useLanguage();
  const isActive = isEventActive(event.inicio, event.fim);
  const dateRange = formatDateRange(event.inicio, event.fim, language);

  const eventTypeLabel =
    dictionary.home.eventTypes[
      event.tipo as keyof typeof dictionary.home.eventTypes
    ] || event.tipo;
  const severityLabel =
    dictionary.home.severity[
      event.gravidade as keyof typeof dictionary.home.severity
    ] || event.gravidade;

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        EVENT_TYPE_COLORS[event.tipo],
        isActive && "ring-2 ring-blue-400"
      )}
      onClick={() => onClick(event)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(event);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Evento ${eventTypeLabel} em ${event.local}`}
      data-cy={EVENT_CARD_ELEMENTS.CARD}
    >
      {isActive && (
        <div
          className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-500"
          data-cy={EVENT_CARD_ELEMENTS.STATUS_INDICATOR}
          aria-label="Evento ativo"
        >
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-gray-900"
            data-cy={EVENT_CARD_ELEMENTS.TITLE}
          >
            {eventTypeLabel}
          </h3>
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border",
              SEVERITY_COLORS[event.gravidade]
            )}
            data-cy={EVENT_CARD_ELEMENTS.SEVERITY_BADGE}
          >
            {severityLabel}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span data-cy={EVENT_CARD_ELEMENTS.LOCATION}>{event.local}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span data-cy={EVENT_CARD_ELEMENTS.DATE_RANGE}>{dateRange}</span>
        </div>

        <p
          className="text-sm text-gray-700 line-clamp-2"
          data-cy={EVENT_CARD_ELEMENTS.DESCRIPTION}
        >
          {event.descricao}
        </p>

        {isActive && (
          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
            <AlertCircle className="h-4 w-4" />
            <span>{dictionary.home.modal.activeEvent}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
