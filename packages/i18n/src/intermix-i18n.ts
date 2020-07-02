import './set-public-path';
import IntermixI18n from './i18next-init';

// Anything exported from this file is importable by other in-browser modules.
export function init(msg) {
    IntermixI18n.getInstance().init();
}

export function changeLanguage(lang) {
    IntermixI18n.getInstance().changeLanguage(lang);
}