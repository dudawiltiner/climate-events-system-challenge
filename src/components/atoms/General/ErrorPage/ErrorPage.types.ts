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
