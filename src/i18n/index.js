import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import fr from './fr.json'
import en from './en.json'
import de from './de.json'
import it from './it.json'
import es from './es.json'
import nl from './nl.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      de: { translation: de },
      it: { translation: it },
      es: { translation: es },
      nl: { translation: nl },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang',
    },
    interpolation: { escapeValue: false },
  })

export default i18n
