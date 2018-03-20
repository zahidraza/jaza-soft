import { AnyAction } from 'redux'

import * as ResourceActions from '../../../action/resourceAction'
import createDataReducer, {
  State as DataState,
  Action as DataAction
} from './data'
import { DataType } from '../../../types'
// import list from './list';

export interface State<T extends DataType> {
  [resource: string]: {
    props?: ResourceActions.Payload
    data?: DataState<T>
  }
}

type Action = ResourceActions.DeclareResourceAction | DataAction<DataType>

const initialState: State<DataType> = {}

export default (
  previousState = initialState,
  action: Action
): State<DataType> => {
  if (action.type === ResourceActions.DECLARE_RESOURCES) {
    const newState = (action as ResourceActions.DeclareResourceAction).payload.reduce(
      (acc, resource) => ({
        ...acc,
        [resource.name]: {
          props: resource,
          data: createDataReducer(resource.name)(undefined, action)
          // list: listReducer(resource.name)(undefined, action)
        }
      }),
      {}
    )
    return newState
  }
  const { meta } = action as DataAction<DataType>
  if (!meta || !meta.resource) {
    return previousState
  }

  const resources = Object.keys(previousState)
  const newState = resources.reduce(
    (acc, resource) => ({
      ...acc,
      [resource]:
        meta.resource === resource
          ? {
              props: previousState[resource].props,
              data: createDataReducer(resource)(
                previousState[resource].data,
                action
              )
              // list: listReducer(resource)(
              //     previousState[resource].list,
              //     action
              // ),
            }
          : {
              props: previousState[resource].props,
              data: previousState[resource].data
              // list: previousState[resource].list
            }
    }),
    {}
  )

  return newState
}

export const getResources = (state: State<DataType>) =>
  Object.keys(state).map(key => state[key].props)
