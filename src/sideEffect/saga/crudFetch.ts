import {
  all,
  put,
  call,
  cancelled,
  takeEvery,
  takeLatest,
  GenericAllEffect,
  AllEffect
} from 'redux-saga/effects'

import { Action } from 'redux'
import * as FetchActions from '../../action/fetchAction'
import * as CrudActions from '../../action/crudAction'
import { FnRestClient } from '../../rest/httpClients'
import { FetchStatus } from '../../constants'
import { DataType } from '../../types'

const crudFetch = (restClient: FnRestClient) => {
  function* handleFetch(action: CrudActions.CrudFetchActions) {
    const { type, options, meta: { fetch: fetchMeta, ...meta } } = action
    const restType = fetchMeta

    yield all([
      put({ type: `${type}_PROGRESS`, options, meta }),
      put({ type: FetchActions.FETCH_START })
    ])
    let resp: Promise<DataType>
    try {
      resp = yield call(restClient, restType, options)
      const data = resp.then(r => r)
      yield put({
        type: `${type}_SUCCESS`,
        payload: data,
        requestPayload: options,
        meta: {
          ...meta,
          fetchResponse: restType,
          fetchStatus: FetchStatus.SUCCESS
        }
      })
      yield put({ type: FetchActions.FETCH_END })
    } catch (error) {
      console.log(error)
      yield put({
        type: `${type}_FAILURE`,
        error: error.message ? error.message : error,
        payload: error.body ? error.body : null,
        requestPayload: options,
        meta: {
          ...meta,
          fetchResponse: restType,
          fetchStatus: FetchStatus.ERROR
        }
      })
      yield put({ type: FetchActions.FETCH_ERROR, error })
    } finally {
      if (yield cancelled()) {
        yield put({ type: FetchActions.FETCH_CANCEL })
        return /* eslint no-unsafe-finally:0 */
      }
    }
  }

  return function* watchCrudFetch() {
    yield all([
      takeLatest((action: Action) => {
        const { meta } = action as CrudActions.CrudFetchActions
        return meta && meta.fetch && meta.cancelPrevious
      }, handleFetch),
      takeEvery((action: Action) => {
        const { meta } = action as CrudActions.CrudFetchActions
        return meta && meta.fetch && !meta.cancelPrevious
      }, handleFetch)
    ])
  }
}

export default crudFetch
