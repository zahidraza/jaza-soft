import * as NfnActions from '../../action/notificationAction'

export interface State {
  text: string
  type: NfnActions.NfnTypes
}

const defaultState: State = {
  text: '',
  type: 'info' // one of 'info', 'confirm', 'warning'
}

export default (
  previousState: State = defaultState,
  action: NfnActions.All
): State => {
  switch (action.type) {
    case NfnActions.SHOW_NOTIFICATION:
      return { text: action.payload.text, type: action.payload.type }
    case NfnActions.HIDE_NOTIFICATION:
      return { ...previousState, text: '' }
    default:
      return previousState
  }
}
