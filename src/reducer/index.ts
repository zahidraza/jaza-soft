import { combineReducers, ReducersMapObject, AnyAction } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import jazasoft from './jazasoft'

const createAppReducer = (
  customReducers: ReducersMapObject,
  locale: string
) => {
  return combineReducers({
    jazasoft,
    form: formReducer,
    routing: routerReducer,
    ...customReducers
  })
}

export default createAppReducer
