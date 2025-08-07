"use client";

import LanguageSelector from "@atoms/General/LanguageSelector";
import Logo from "@atoms/General/Logo";
import { useLanguage } from "@hooks/useLanguage";
import Image from "next/image";
import { useState } from "react";
import { HEADER_ELEMENTS } from "./Header.enum";
import { HeaderProps } from "./Header.types";

const Header = ({ title }: HeaderProps) => {
  const [imageError, setImageError] = useState(false);
  const { dictionary } = useLanguage();

  const headerTitle = title || dictionary.home.header.title;
  const headerSubtitle = dictionary.home.header.subtitle;
  const systemStatus = dictionary.home.header.systemStatus;

  return (
    <header
      className="bg-white border-b border-gray-200 shadow-sm"
      data-cy={HEADER_ELEMENTS.HEADER}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            {!imageError ? (
              <Image
                src="https://www.i4sea.com/_ipx/w_256,q_75/%2Flogo.png?url=%2Flogo.png&w=256&q=75"
                alt="i4sea Logo"
                width={48}
                height={48}
                className="h-12 w-32 rounded-lg"
                data-cy={HEADER_ELEMENTS.LOGO}
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <Logo size="md" />
            )}

            <div className="text-center sm:text-left">
              <h1
                className="text-xl sm:text-2xl font-bold text-gray-900"
                data-cy={HEADER_ELEMENTS.TITLE}
              >
                {headerTitle}
              </h1>
              <p
                className="text-xs sm:text-sm text-gray-600 mt-1"
                data-cy={HEADER_ELEMENTS.SUBTITLE}
              >
                {headerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <LanguageSelector className="order-2 sm:order-1" />
            <div className="flex items-center order-1 sm:order-2">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{systemStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
