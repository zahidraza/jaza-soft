import { actionTypes } from 'redux-form'
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'
import * as CrudActions from '../../action/crudAction'

type State = boolean | { redirect?: string }

type Action =
  | CrudActions.CreateAction
  | CrudActions.CreateSuccessAction
  | CrudActions.CreateFailureAction
  | CrudActions.UpdateAction
  | CrudActions.UpdateSuccessAction
  | CrudActions.UpdateFailureAction
  | LocationChangeAction

export default (previousState: State = false, action: Action): State => {
  switch (action.type) {
    case CrudActions.CRUD_CREATE:
    case CrudActions.CRUD_UPDATE:
      return { redirect: (action as CrudActions.UpdateAction).meta.redirectTo }
    case LOCATION_CHANGE:
    case actionTypes.SET_SUBMIT_FAILED:
    case CrudActions.CRUD_CREATE_SUCCESS:
    case CrudActions.CRUD_CREATE_FAILURE:
    case CrudActions.CRUD_UPDATE_SUCCESS:
    case CrudActions.CRUD_UPDATE_FAILURE:
      return false
    default:
      return previousState
  }
}
