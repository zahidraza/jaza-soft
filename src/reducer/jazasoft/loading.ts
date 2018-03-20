import * as FetchActions from '../../action/fetchAction'
import * as AuthActions from '../../action/authAction'

export type State = number

export type AuthAction =
  | AuthActions.LoginProgressAction
  | AuthActions.LoginSuccessAction
  | AuthActions.LoginFailureAction

export default (
  previousState: State = 0,
  { type }: FetchActions.All | AuthAction
): number => {
  switch (type) {
    case FetchActions.FETCH_START:
    case AuthActions.LOGIN_PROGRESS:
      return previousState + 1
    case FetchActions.FETCH_END:
    case FetchActions.FETCH_ERROR:
    case FetchActions.FETCH_CANCEL:
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.LOGIN_FAILURE:
      return Math.max(previousState - 1, 0)
    default:
      return previousState
  }
}
