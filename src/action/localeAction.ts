export const CHANGE_LOCALE = 'JS/CHANGE_LOCALE'

export interface LocaleAction {
  type: typeof CHANGE_LOCALE
  payload?: string
}

export const changeLocale = (locale: string): LocaleAction => ({
  type: CHANGE_LOCALE,
  payload: locale
})
