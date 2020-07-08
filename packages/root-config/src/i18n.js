import i18n from "i18next";
import { initReactI18next } from "react-i18next";

window.i18next = i18n.default || i18n;
const i18nConfig = {
  resources: {
    en: {
      translation: {
        "Welcome to React": "Welcome to React and react-i18next",
        "is mounted!": "is mounted!",
        Dashboard: "Dashboard",
        Reports: "Reports",
        Search: "Search",
        Calendar: "Calendar",
        Account: "Account",
        Support: "Support",
        "Sign Out": "Sign Out",
      },
    },
    fr: {
      translation: {
        "Welcome to React": "Bienvenue dans React et react-i18next",
        "is mounted!": "est monté!",
        Dashboard: "Tableau de bord",
        Search: "Chercher",
        Reports: "Rapports",
        Calendar: "Calendrier",
        Account: "Compte",
        Support: "Soutien",
        "Sign Out": "Déconnexion",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
};

const i18nPromise = (i18n.default || i18n)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nConfig);

export default i18nPromise;
