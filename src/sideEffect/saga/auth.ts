import {
  all,
  put,
  call,
  takeEvery,
  AllEffect,
  GenericAllEffect
} from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'

import {
  showNotification,
  hideNotification
} from '../../action/notificationAction'

import * as AuthActions from '../../action/authAction'
import * as FetchActions from '../../action/fetchAction'
import { AuthType } from '../../constants'
import { FnAuthClient } from '../../rest/httpClients'

type AuthAction =
  | AuthActions.LoginAction
  | AuthActions.LogoutAction
  | AuthActions.UserCheckAction

const authSaga = (authClient: FnAuthClient) => {
  if (!authClient) return () => null
  function* handleAuth(action: AuthAction | FetchActions.FetchErrorAction) {
    const { type } = action
    switch (type) {
      case AuthActions.LOGIN: {
        try {
          const loginAction = action as AuthActions.LoginAction
          yield put({ type: AuthActions.LOGIN_PROGRESS })
          yield call(authClient, AuthType.AUTH_LOGIN, loginAction.payload)
          yield put({ type: AuthActions.LOGIN_SUCCESS })
          yield put(push(loginAction.meta.pathName || '/'))
        } catch (e) {
          yield put({ type: AuthActions.LOGIN_FAILURE })
          const errorMessage =
            typeof e === 'string'
              ? e
              : typeof e === 'undefined' || !e.message
                ? 'aor.auth.sign_in_error'
                : e.message
          yield put(showNotification(errorMessage, 'warning'))
        }
        break
      }
      case AuthActions.USER_CHECK: {
        try {
          yield call(authClient, AuthType.AUTH_CHECK)
        } catch (e) {
          yield call(authClient, AuthType.AUTH_LOGOUT)
          yield put(
            replace({
              pathname: (e && e.redirectTo) || '/login',
              state: {
                nextPathname: (action as AuthActions.UserCheckAction).meta
                  .pathName
              }
            })
          )
        }
        break
      }

      case AuthActions.LOGOUT: {
        yield call(authClient, AuthType.AUTH_LOGOUT)
        yield put(push('/login'))
        break
      }

      case FetchActions.FETCH_ERROR:
        try {
          yield call(
            authClient,
            AuthType.AUTH_ERROR,
            (action as FetchActions.FetchErrorAction).error
          )
        } catch (e) {
          yield call(authClient, AuthType.AUTH_LOGOUT)
          yield put(push('/login'))
          yield put(hideNotification())
        }
        break
    }
  }
  return function* watchAuthActions() {
    yield all([
      takeEvery(
        [AuthActions.LOGIN, AuthActions.LOGOUT, AuthActions.USER_CHECK],
        handleAuth
      ),
      takeEvery(FetchActions.FETCH_ERROR, handleAuth)
    ])
  }
}

export default authSaga
