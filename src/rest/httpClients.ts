import { AuthType, RestType } from '../constants'
import { Param, AuthParam, DataType } from '../types'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export type FnAuthClient = (type: AuthType, params?: AuthParam) => Promise<any>

export const createOAuth2Client = (
  oauthBaseUrl: string,
  basicAuthorization: string
): FnAuthClient => (type: AuthType, params?: AuthParam) => {
  if (type === AuthType.AUTH_LOGIN) {
    const payload = params as Param
    if (!payload.username || !payload.password) {
      return Promise.reject(
        'field "username" and "password" required for type = ' +
          AuthType.AUTH_LOGIN
      )
    }
    if (!basicAuthorization || !localStorage.basicAuthorization) {
      return Promise.reject(
        'basicAuthorization should be passed to authClient or set in localStorage with key = "basicAuthorization"'
      )
    }
    let config = {
      url: `${oauthBaseUrl}/oauth/token`,
      method: 'post',
      params,
      headers: {
        Accept: 'application/json',
        Authorization: basicAuthorization || localStorage.basicAuthorization
      }
    }
    return axios.request<any>(config).then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
      }
      if (response.data && response.data['access_token']) {
        const token = response.data['access_token']
        localStorage.setItem('token', token)
      }
      return Promise.resolve(response.data)
    })
  } else if (type === AuthType.AUTH_LOGOUT) {
    delete localStorage.token
    // TODO: redirection action might be generated
    return Promise.resolve()
  } else if (type === AuthType.AUTH_ERROR) {
    const error = params as AxiosError
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('token')
      return Promise.reject('Session Expired')
    }
    return Promise.resolve()
  } else if (type === AuthType.AUTH_CHECK) {
    return localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject('Token not found in localStorage')
  } else if (type === AuthType.AUTH_GET_PERMISSIONS) {
    return Promise.resolve()
  }
  return Promise.reject('Unknown AuthType.')
}

export type FnRestClient = (
  restType: RestType,
  options: AxiosRequestConfig
) => Promise<DataType>

export const createRestClient = (baseUrl: string): FnRestClient => {
  const convertRESTRequestToHTTP = (
    restType: RestType,
    options: AxiosRequestConfig
  ): AxiosRequestConfig => {
    options.baseURL = baseUrl
    switch (restType) {
      case RestType.GET_LIST:
        options.method = 'GET'
        break
      case RestType.GET_ONE:
        options.method = 'GET'
        break
      case RestType.GET_MANY_REFERENCE:
        options.method = 'GET'
        break
      case RestType.UPDATE:
        options.method = 'PUT'
        break
      case RestType.PATCH:
        options.method = 'PATCH'
        break
      case RestType.CREATE:
        options.method = 'POST'
        break
      case RestType.DELETE:
        options.method = 'DELETE'
        break
      case RestType.CUSTOM:
        break
      default:
        throw new Error(`Unsupported fetch action type ${restType}`)
    }
    return options
  }

  return (
    restType: RestType,
    options: AxiosRequestConfig
  ): Promise<DataType> => {
    options = convertRESTRequestToHTTP(restType, options)
    let requestHeaders = options.headers || {}
    if (options.data && !('Content-Type' in requestHeaders)) {
      requestHeaders['Content-Type'] = 'application/json'
    }
    if (options.data && !('Accept' in requestHeaders)) {
      requestHeaders['Accept'] = 'application/json'
    }
    if (localStorage['access_token']) {
      requestHeaders['Authorization'] = 'Bearer ' + localStorage['access_token']
    }

    return axios
      .request<DataType>(options)
      .then(response => {
        // TODO: Pre-Processing of Response (If Any)

        return Promise.resolve(response.data)
      })
      .catch(error => {
        // TODO: Generic Error Handling

        console.log(error)
        return Promise.reject(error)
      })
  }
}
