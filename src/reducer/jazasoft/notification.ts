import * as NfnActions from '../../action/notificationAction'

export interface NfnState {
  text: string
  type: NfnActions.NfnTypes
}

const defaultState: NfnState = {
  text: '',
  type: 'info' // one of 'info', 'confirm', 'warning'
}

export default (
  previousState: NfnState = defaultState,
  action: NfnActions.All
): NfnState => {
  switch (action.type) {
    case NfnActions.SHOW_NOTIFICATION:
      return { text: action.payload.text, type: action.payload.type }
    case NfnActions.HIDE_NOTIFICATION:
      return { ...previousState, text: '' }
    default:
      return previousState
  }
}
