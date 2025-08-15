import "server-only";

const dictionaries = {
  en: () =>
    import("../../locales/en/translation.json").then(
      (module) => module.default
    ),
  fr: () =>
    import("../../locales/fr/translation.json").then(
      (module) => module.default
    ),
  ar: () =>
    import("../../locales/ar/translation.json").then(
      (module) => module.default
    ),
  de: () =>
    import("../../locales/de/translation.json").then(
      (module) => module.default
    ),
  es: () =>
    import("../../locales/es/translation.json").then(
      (module) => module.default
    ),
  it: () =>
    import("../../locales/it/translation.json").then(
      (module) => module.default
    ),
  tr: () =>
    import("../../locales/tr/translation.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
