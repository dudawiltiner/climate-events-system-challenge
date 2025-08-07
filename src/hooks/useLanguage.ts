import { languageAtom } from "@context/events.store";
import { defaultDictionary, Langs } from "@dictionaries/default-dictionaries";
import { useAtom } from "jotai";

export const useLanguage = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  const dictionary = defaultDictionary[language];

  const changeLanguage = (newLanguage: Langs) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    dictionary,
    changeLanguage,
  };
};
