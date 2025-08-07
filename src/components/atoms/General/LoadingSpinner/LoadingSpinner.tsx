"use client";

import { useLanguage } from "@hooks/useLanguage";
import { LOADING_SPINNER_ELEMENTS } from "./LoadingSpinner.enum";
import { LoadingSpinnerProps } from "./LoadingSpinner.types";

const LoadingSpinner = ({
  size = "md",
  text,
  className = "",
}: LoadingSpinnerProps) => {
  const { dictionary } = useLanguage();
  const defaultText = text || dictionary.home.loading.app;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 ${className}`}
      data-cy={LOADING_SPINNER_ELEMENTS.CONTAINER}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        data-cy={LOADING_SPINNER_ELEMENTS.SPINNER}
      ></div>
      <span
        className="text-sm text-gray-600"
        data-cy={LOADING_SPINNER_ELEMENTS.TEXT}
      >
        {defaultText}
      </span>
    </div>
  );
};

export default LoadingSpinner;
