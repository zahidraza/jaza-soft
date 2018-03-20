import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux'
import { reducer as formReducer, FormState } from 'redux-form'
import { routerReducer, RouterState } from 'react-router-redux'

import jazasoft, { State as JazasoftState } from './jazasoft'
import { DataType } from '../types'

export interface AppState<T extends DataType> {
  jazasoft: JazasoftState<T>
  form: FormState
  routing: RouterState
  [key: string]: any
}

const createAppReducer = (
  customReducers: ReducersMapObject,
  locale: string
): Reducer<AppState<DataType>> =>
  combineReducers<AppState<DataType>>({
    jazasoft,
    form: formReducer,
    routing: routerReducer,
    ...customReducers
  })

export default createAppReducer
