import { DEFAULT_LOCALE } from '../i18n/index'
import * as LocaleActions from '../action/localeAction'
import { Reducer, AnyAction } from 'redux'

export type State = string

export default (initialLocale: State = DEFAULT_LOCALE): Reducer<State> => (
  initialState: State = initialLocale,
  { type, payload }: LocaleActions.LocaleAction
): State => {
  switch (type) {
    case LocaleActions.CHANGE_LOCALE:
      if (payload) return payload
      return initialState
    default:
      return initialState
  }
}
