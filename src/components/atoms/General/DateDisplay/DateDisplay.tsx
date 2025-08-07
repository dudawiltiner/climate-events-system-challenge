"use client";

import {
  formatDateRange,
  formatFullDate,
  formatRelativeDate,
  getDayOfWeek,
  isToday,
} from "@functions/date.utils";
import { useLanguage } from "@hooks/useLanguage";
import { DATE_DISPLAY_ELEMENTS } from "./DateDisplay.enum";
import { DateDisplayProps } from "./DateDisplay.types";

const DateDisplay = ({
  startDate,
  endDate,
  showRelative = false,
  className = "",
}: DateDisplayProps) => {
  const { dictionary, language } = useLanguage();

  const dateRange = formatDateRange(startDate, endDate, language);
  const relativeDate = formatRelativeDate(startDate, language);
  const fullStartDate = formatFullDate(startDate, language);
  const dayOfWeek = getDayOfWeek(startDate, language);
  const isEventToday = isToday(startDate);

  return (
    <div
      className={`space-y-2 ${className}`}
      data-cy={DATE_DISPLAY_ELEMENTS.CONTAINER}
    >
      <div className="text-sm text-gray-600">
        <span className="font-medium">{dictionary.home.modal.period}:</span>{" "}
        {dateRange}
      </div>

      {showRelative && (
        <div className="text-xs text-gray-500">{relativeDate}</div>
      )}

      <div className="text-xs text-blue-600">{dayOfWeek}</div>

      {isEventToday && (
        <div className="text-xs text-green-600 font-medium">
          {dictionary.home.dates.today}
        </div>
      )}

      <div className="text-xs text-gray-500">{fullStartDate}</div>
    </div>
  );
};

export default DateDisplay;
