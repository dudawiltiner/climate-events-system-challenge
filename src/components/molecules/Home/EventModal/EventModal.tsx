"use client";

import Button from "@atoms/General/Button/Button";
import { SEVERITY_COLORS } from "@constants/events.constants";
import {
  convertUTCToBahiaTime,
  formatDateRange,
  formatFullDate,
  isEventActive,
} from "@functions/date.utils";
import { useLanguage } from "@hooks/useLanguage";
import { cn } from "@styles/utils";
import { AlertCircle, Calendar, Clock, MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { EVENT_MODAL_ELEMENTS } from "./EventModal.enum";
import { EventModalProps } from "./EventModal.types";

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const { dictionary, language } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const isActive = isEventActive(event.inicio, event.fim);
  const dateRange = formatDateRange(event.inicio, event.fim, language);
  const startDate = convertUTCToBahiaTime(event.inicio, language);
  const endDate = convertUTCToBahiaTime(event.fim, language);
  const fullStartDate = formatFullDate(event.inicio, language);
  const fullEndDate = formatFullDate(event.fim, language);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-cy={EVENT_MODAL_ELEMENTS.OVERLAY}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl"
        data-cy={EVENT_MODAL_ELEMENTS.MODAL}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-gray-900"
            data-cy={EVENT_MODAL_ELEMENTS.TITLE}
          >
            {eventTypeLabel}
          </h2>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            leftIcon={<X className="h-5 w-5" />}
            data-cy={EVENT_MODAL_ELEMENTS.CLOSE_BUTTON}
            aria-label="Fechar modal"
          >
            {dictionary.home.modal.close}
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border",
                SEVERITY_COLORS[event.gravidade]
              )}
              data-cy={EVENT_MODAL_ELEMENTS.SEVERITY_BADGE}
            >
              {dictionary.home.modal.severity}: {severityLabel}
            </div>

            {isActive && (
              <div
                className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                data-cy={EVENT_MODAL_ELEMENTS.STATUS_INDICATOR}
              >
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {dictionary.home.modal.activeEvent}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {dictionary.home.modal.location}
                </h3>
                <p
                  className="text-gray-700"
                  data-cy={EVENT_MODAL_ELEMENTS.LOCATION}
                >
                  {event.local}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {dictionary.home.modal.period}
                </h3>
                <p
                  className="text-gray-700"
                  data-cy={EVENT_MODAL_ELEMENTS.DATE_RANGE}
                >
                  {dateRange}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {dictionary.home.modal.start}
                  </h3>
                  <p className="text-gray-700">{fullStartDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {dictionary.home.modal.end}
                  </h3>
                  <p className="text-gray-700">{fullEndDate}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {dictionary.home.modal.description}
                </h3>
                <p
                  className="text-gray-700 leading-relaxed"
                  data-cy={EVENT_MODAL_ELEMENTS.DESCRIPTION}
                >
                  {event.descricao}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
