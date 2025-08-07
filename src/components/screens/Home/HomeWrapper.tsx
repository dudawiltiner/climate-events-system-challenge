"use client";

import LoadingSpinner from "@atoms/General/LoadingSpinner";
import { useLanguage } from "@hooks/useLanguage";
import { useEffect, useState } from "react";
import Home from "./Home";
import { HOME_WRAPPER_ELEMENTS } from "./HomeWrapper.enum";
import { HomeWrapperProps } from "./HomeWrapper.types";

const HomeWrapper = ({ className = "" }: HomeWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const { dictionary } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${className}`}
        data-cy={HOME_WRAPPER_ELEMENTS.LOADING}
      >
        <LoadingSpinner size="lg" text={dictionary.home.loading.app} />
      </div>
    );
  }

  return (
    <div className={className} data-cy={HOME_WRAPPER_ELEMENTS.CONTAINER}>
      <Home />
    </div>
  );
};

export default HomeWrapper;
