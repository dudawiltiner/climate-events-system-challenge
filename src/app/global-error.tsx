"use client";

import ErrorPage from "@atoms/General/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorPage type="500" errorCode={error.digest} onRetry={reset} />
      </body>
    </html>
  );
}
