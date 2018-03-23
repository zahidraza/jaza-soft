export const LOGIN = 'JS/LOGIN'
export const LOGIN_PROGRESS = 'JS/LOGIN_PROGRESS'
export const LOGIN_FAILURE = 'JS/LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'JS/LOGIN_SUCCESS'

export interface LoginPayload {
  username: string
  password: string
  appId?: string
}

export interface LoginAction {
  type: typeof LOGIN
  payload: LoginPayload
  meta: { auth: boolean; pathName: string }
}
export interface LoginProgressAction {
  type: typeof LOGIN_PROGRESS
}
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
}
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE
}

export const login = (
  payload: LoginPayload,
  pathName: string
): LoginAction => ({
  type: LOGIN,
  payload,
  meta: { auth: true, pathName }
})

/**
 * Check User If still logged in.
 */
export const USER_CHECK = 'JS/USER_CHECK'

export interface UserCheckParam {
  resource: string // Base Resource Path e.g 'order'
  route: string // Relative Path of Page e.g. 'list'
}

export interface UserCheckAction {
  type: typeof USER_CHECK
  payload: UserCheckParam
  meta: { auth: boolean; pathName: string }
}

export const userCheck = (
  payload: UserCheckParam,
  pathName: string
): UserCheckAction => ({
  type: USER_CHECK,
  payload,
  meta: { auth: true, pathName }
})

/**
 * Logout User
 */
export const LOGOUT = 'JS/LOGOUT'

export interface LogoutAction {
  type: typeof LOGOUT
  meta: { auth: boolean }
}

export const userLogout = () => ({
  type: LOGOUT,
  meta: { auth: true }
})
