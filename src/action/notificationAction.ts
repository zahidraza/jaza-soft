export const SHOW_NOTIFICATION = 'JS/SHOW_NOTIFICATION'

export type NfnTypes = 'info' | 'warning' | 'confirm'
export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION
  payload: {
    text: string
    type: NfnTypes
  }
}
export const showNotification = (
  text: string,
  type: NfnTypes = 'info'
): ShowNotificationAction => ({
  type: SHOW_NOTIFICATION,
  payload: { text, type }
})

export const HIDE_NOTIFICATION = 'JS/HIDE_NOTIFICATION'
export interface HideNotificationAction {
  type: typeof HIDE_NOTIFICATION
}
export const hideNotification = (): HideNotificationAction => ({
  type: HIDE_NOTIFICATION
})

export type NfnActions = ShowNotificationAction | HideNotificationAction
