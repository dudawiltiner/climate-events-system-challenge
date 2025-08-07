"use client";

import Button from "@atoms/General/Button/Button";
import { useLanguage } from "@hooks/useLanguage";
import { AlertTriangle, HomeIcon, RefreshCw, Search } from "lucide-react";
import { ERROR_PAGE_ELEMENTS } from "./ErrorPage.enum";

export interface ErrorPageProps {
  type: "404" | "500" | "network" | "general";
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  errorCode?: string;
  className?: string;
}

const ErrorPage = ({
  type,
  title,
  description,
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
  onGoHome,
  errorCode,
  className = "",
}: ErrorPageProps) => {
  const { dictionary } = useLanguage();

  const getErrorConfig = () => {
    switch (type) {
      case "404":
        return {
          icon: <Search className="w-12 h-12 text-red-600" />,
          defaultTitle: dictionary.error.notFound.title,
          defaultDescription: dictionary.error.notFound.description,
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      case "500":
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-600" />,
          defaultTitle: dictionary.error.serverError.title,
          defaultDescription: dictionary.error.serverError.description,
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      case "network":
        return {
          icon: <AlertTriangle className="w-12 h-12 text-yellow-600" />,
          defaultTitle: dictionary.error.networkError.title,
          defaultDescription: dictionary.error.networkError.description,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-600" />,
          defaultTitle: dictionary.error.general.title,
          defaultDescription: dictionary.error.general.description,
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
    }
  };

  const config = getErrorConfig();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center px-4 ${className}`}
      data-cy={ERROR_PAGE_ELEMENTS.CONTAINER}
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-8" data-cy={ERROR_PAGE_ELEMENTS.ICON}>
          <div
            className={`mx-auto w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center`}
          >
            {type === "404" ? (
              <span className="text-4xl font-bold text-red-600">404</span>
            ) : (
              config.icon
            )}
          </div>
        </div>

        <h1
          className="text-3xl font-bold text-gray-900 mb-4"
          data-cy={ERROR_PAGE_ELEMENTS.TITLE}
        >
          {title || config.defaultTitle}
        </h1>

        <p
          className="text-gray-600 mb-4"
          data-cy={ERROR_PAGE_ELEMENTS.DESCRIPTION}
        >
          {description || config.defaultDescription}
        </p>

        {errorCode && (
          <p
            className="text-sm text-gray-500 mb-8"
            data-cy={ERROR_PAGE_ELEMENTS.ERROR_CODE}
          >
            Código de erro: {errorCode}
          </p>
        )}

        <div className="space-y-4">
          {showHomeButton && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleGoHome}
              leftIcon={<HomeIcon className="w-5 h-5" />}
              className="w-full"
              data-cy={ERROR_PAGE_ELEMENTS.HOME_BUTTON}
            >
              {dictionary.error.notFound.backHome}
            </Button>
          )}

          {showRetryButton && (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleRetry}
              leftIcon={<RefreshCw className="w-5 h-5" />}
              className="w-full"
              data-cy={ERROR_PAGE_ELEMENTS.RETRY_BUTTON}
            >
              {dictionary.error.general.retry}
            </Button>
          )}
        </div>

        <div
          className="mt-8 pt-8 border-t border-gray-200"
          data-cy={ERROR_PAGE_ELEMENTS.FOOTER}
        >
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
