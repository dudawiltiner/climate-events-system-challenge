"use client";

import { LOGO_ELEMENTS } from "./Logo.enum";
import { LogoProps } from "./Logo.types";

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={`flex items-center justify-center bg-blue-600 text-white font-bold rounded-lg shadow-md ${sizeClasses[size]} ${className}`}
      data-cy={LOGO_ELEMENTS.CONTAINER}
    >
      <span className="font-mono" data-cy={LOGO_ELEMENTS.TEXT}>
        i4sea
      </span>
    </div>
  );
};

export default Logo;
