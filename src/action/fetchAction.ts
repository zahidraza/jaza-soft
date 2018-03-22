import { AxiosError } from 'axios'

export const FETCH_START = 'JS/FETCH_START'
export const FETCH_END = 'JS/FETCH_END'
export const FETCH_ERROR = 'JS/FETCH_ERROR'
export const FETCH_CANCEL = 'JS/FETCH_CANCEL'

export interface FetchStartAction {
  type: typeof FETCH_START
}
export interface FetchEndAction {
  type: typeof FETCH_END
}
export interface FetchErrorAction {
  type: typeof FETCH_ERROR
  error: AxiosError
}
export interface FetchCancelAction {
  type: typeof FETCH_CANCEL
}

export type FetchActions =
  | FetchStartAction
  | FetchEndAction
  | FetchErrorAction
  | FetchCancelAction
