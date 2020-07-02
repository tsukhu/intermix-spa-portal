import * as i18n from "i18next/index";
import { initReactI18next } from "react-i18next";

const i18next = i18n.default;

const i18nConfig = {
  resources: {
    en: {
      translation: {
        "Welcome to React": "Welcome to React and react-i18next",
        "is mounted!":"is mounted!",
      },
    },
    fr: {
      translation: {
        "Welcome to React": "Bienvenue dans React et react-i18next",
        "is mounted!":"est monté!",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
};

export default class IntermixI18n {
  private static instance: IntermixI18n;
  i18nInit = (service?: any) =>
    i18next
      .use(initReactI18next) // passes i18n down to react-i18next
      .init(i18nConfig);

  localeIdFactory = (service?: any) => i18next.language;

  constructor() {
    if (IntermixI18n.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }
  }

  static getInstance(): IntermixI18n {
    IntermixI18n.instance = IntermixI18n.instance || new IntermixI18n();
    return IntermixI18n.instance;
  }

  init(): any {
    return this.i18nInit();
  }

  changeLanguage(lang:any) {
    return i18next.changeLanguage(lang);
  }
}
