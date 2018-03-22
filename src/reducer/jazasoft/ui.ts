import * as UIActions from '../../action/uiAction'

export interface State {
  sidebarOpen: boolean
  viewVersion: number
}

const defaultState: State = {
  sidebarOpen: false,
  viewVersion: 0
}

export default (
  previousState: State = defaultState,
  action: UIActions.UiActions
) => {
  switch (action.type) {
    case UIActions.TOGGLE_SIDEBAR:
      return {
        ...previousState,
        sidebarOpen: !previousState.sidebarOpen
      }
    case UIActions.SIDEBAR_VISIBILITY:
      return { ...previousState, sidebarOpen: action.payload }
    case UIActions.REFRESH_VIEW:
      return {
        ...previousState,
        viewVersion: previousState.viewVersion + 1
      }
    default:
      return previousState
  }
}
