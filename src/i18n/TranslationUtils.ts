export const DEFAULT_LOCALE = 'en'

export const resolveBrowserLocale = (defaultLocale = DEFAULT_LOCALE) => {
  // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
  // Rely on the window.navigator object to determine user locale
  // const { language, browserLanguage, userLanguage } = window.navigator;
  const { language } = window.navigator
  return (language || defaultLocale).split('-')[0]
}
