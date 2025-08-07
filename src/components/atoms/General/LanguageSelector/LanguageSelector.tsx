"use client";

import { Langs } from "@dictionaries/default-dictionaries";
import { useLanguage } from "@hooks/useLanguage";
import { LANGUAGES } from "./LanguageSelector.enum";
import { LanguageSelectorProps } from "./LanguageSelector.types";

const LanguageSelector = ({ className = "" }: LanguageSelectorProps) => {
  const { language, changeLanguage } = useLanguage();

  const languages: { code: Langs; name: string; flag: string }[] = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
  ];

  return (
    <div
      className={`flex items-center ${className}`}
      data-cy={LANGUAGES.CONTAINER}
    >
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as Langs)}
        className="flex h-8 w-auto min-w-[100px] rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:border-gray-400 transition-colors"
        data-cy={LANGUAGES.SELECT}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-sm">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
