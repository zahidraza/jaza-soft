import { AnyAction } from 'redux'
const pickBy = require('lodash.pickby')

import { DataType } from '../../../types'
import { FetchStatus } from '../../../constants'
import * as CrudActions from '../../../action/crudAction'
import {
  DeclareResourceAction,
  DECLARE_RESOURCES
} from '../../../action/resourceAction'

/**
 * Declarations
 */
const defaultCacheDuration = 10 * 60 * 1000 // ten minutes

export type ActionType =
  | typeof CrudActions.CRUD_GET_LIST_SUCCESS
  | typeof CrudActions.CRUD_GET_MANY_SUCCESS
  | typeof CrudActions.CRUD_GET_MANY_REFERENCE_SUCCESS
  | typeof CrudActions.CRUD_GET_ONE_SUCCESS
  | typeof CrudActions.CRUD_CREATE_SUCCESS
  | typeof CrudActions.CRUD_UPDATE_SUCCESS

export interface State<T extends DataType> {
  [id: string]: T
}
export interface Action<T extends DataType> extends AnyAction {
  type: ActionType
  payload?: {
    data: T[] | T
  }
  meta?: {
    resource: string
    fetchStatus: string
    fetchResponse: string
  }
}

const fetchedAt = <T extends DataType>(
  newRecords: T[] = [],
  previousState: State<T> = {},
  cacheDuration = defaultCacheDuration,
  now = new Date()
): State<T> => {
  // prepare new records and timestamp them
  const newFetchedAt = newRecords.reduce(
    (acc, record) => ({
      ...acc,
      [record.id]: Object.defineProperty(record, 'fetchedAt', { value: now })
    }),
    {}
  )
  // remove outdated entry
  const latestValidDate = new Date()
  latestValidDate.setTime(latestValidDate.getTime() - cacheDuration)

  const stillValidFetchedAt = pickBy(
    previousState,
    (value: T) => value.fetchedAt > latestValidDate
  )

  return {
    ...stillValidFetchedAt,
    ...newFetchedAt
  }
}

type fetchedAtCallback = typeof fetchedAt

type FnAddRecord = <T extends DataType>(
  newRecords: T[],
  previousState: State<T>
) => State<T>

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
export const addRecordsFactory = (
  fetchedAt: fetchedAtCallback
): FnAddRecord => <T extends DataType>(
  newRecords: T[] = [],
  previousState: State<T>
): State<T> => {
  const newState = fetchedAt(newRecords, previousState)
  return newState
}

const addRecords = addRecordsFactory(fetchedAt)

const initialState: State<DataType> = {}

const createDataReducer = (resource: string) => <A extends Action<DataType>>(
  previousState = initialState,
  action: A | DeclareResourceAction
) => {
  if (action.type === DECLARE_RESOURCES) {
    return previousState
  }

  const { type, payload, meta } = action as A
  if (!meta || meta.resource !== resource) {
    return previousState
  }
  if (meta.fetchStatus !== FetchStatus.SUCCESS) {
    return previousState
  }
  let data: DataType[] | undefined = []
  switch (type) {
    case CrudActions.CRUD_GET_LIST_SUCCESS:
    case CrudActions.CRUD_GET_MANY_SUCCESS:
    case CrudActions.CRUD_GET_MANY_REFERENCE_SUCCESS:
      if (payload) {
        data = payload.data as DataType[]
      }
      return addRecords(data, previousState)
    case CrudActions.CRUD_GET_ONE_SUCCESS:
    case CrudActions.CRUD_UPDATE_SUCCESS:
    case CrudActions.CRUD_CREATE_SUCCESS:
      if (payload) {
        data = [payload.data as DataType]
      }
      return addRecords(data, previousState)
    default:
      return previousState
  }
}

export default createDataReducer

export const getRecord = (state: State<DataType>, id: string) => state[id]
