import { AxiosRequestConfig } from 'axios'
import { RestType } from '../constants'

// export interface CrudMeta {
//   resource: string,
//   fetch: string,
//   cancelPrevious: boolean
// }

export interface Action {
  options: AxiosRequestConfig
  meta: {
    resource: string
    fetch: RestType
    cancelPrevious: boolean
    redirectTo?: string
  }
}

export const CRUD_GET_LIST = 'JS/CRUD_GET_LIST'
export const CRUD_GET_LIST_PROGRESS = 'JS/CRUD_GET_LIST_PROGRESS'
export const CRUD_GET_LIST_FAILURE = 'JS/CRUD_GET_LIST_FAILURE'
export const CRUD_GET_LIST_SUCCESS = 'JS/CRUD_GET_LIST_SUCCESS'

export interface GetListAction extends Action {
  type: typeof CRUD_GET_LIST
}
// export interface GetListProgressAction { type: typeof CRUD_GET_LIST_PROGRESS };
// export interface GetListFailureAction { type: typeof CRUD_GET_LIST_FAILURE };
// export interface GetListSuccessAction { type: typeof CRUD_GET_LIST_SUCCESS };

// export const crudGetList = (
//     resource,
//     pagination,
//     sort,
//     filter,
//     cancelPrevious = true
// ) => ({
//     type: CRUD_GET_LIST,
//     payload: { pagination, sort, filter },
//     meta: { resource, fetch: GET_LIST, cancelPrevious },
// });

export const CRUD_GET_ONE = 'JS/CRUD_GET_ONE'
export const CRUD_GET_ONE_PROGRESS = 'JS/CRUD_GET_ONE_PROGRESS'
export const CRUD_GET_ONE_FAILURE = 'JS/CRUD_GET_ONE_FAILURE'
export const CRUD_GET_ONE_SUCCESS = 'JS/CRUD_GET_ONE_SUCCESS'

export interface GetOneAction extends Action {
  type: typeof CRUD_GET_ONE
}
// export interface GetOneProgressAction { type: typeof CRUD_GET_ONE_PROGRESS };
// export interface GetOneFailureAction { type: typeof CRUD_GET_ONE_FAILURE };
// export interface GetOneSuccessAction { type: typeof CRUD_GET_ONE_SUCCESS };

// export const crudGetOne = (resource, id, basePath, cancelPrevious = true) => ({
//     type: CRUD_GET_ONE,
//     payload: { id, basePath },
//     meta: { resource, fetch: GET_ONE, cancelPrevious },
// });

export const CRUD_CREATE = 'JS/CRUD_CREATE'
export const CRUD_CREATE_PROGRESS = 'JS/CRUD_CREATE_PROGRESS'
export const CRUD_CREATE_FAILURE = 'JS/CRUD_CREATE_FAILURE'
export const CRUD_CREATE_SUCCESS = 'JS/CRUD_CREATE_SUCCESS'

export interface CreateAction extends Action {
  type: typeof CRUD_CREATE
}
// export interface CreateProgressAction { type: typeof CRUD_CREATE_PROGRESS };
export interface CreateFailureAction {
  type: typeof CRUD_CREATE_FAILURE
}
export interface CreateSuccessAction {
  type: typeof CRUD_CREATE_SUCCESS
}

// export const crudCreate = (resource, data, basePath, redirectTo = 'edit') => ({
//     type: CRUD_CREATE,
//     payload: { data, basePath, redirectTo },
//     meta: { resource, fetch: CREATE, cancelPrevious: false },
// });

export const CRUD_UPDATE = 'JS/CRUD_UPDATE'
export const CRUD_UPDATE_PROGRESS = 'JS/CRUD_UPDATE_PROGRESS'
export const CRUD_UPDATE_FAILURE = 'JS/CRUD_UPDATE_FAILURE'
export const CRUD_UPDATE_SUCCESS = 'JS/CRUD_UPDATE_SUCCESS'

export interface UpdateAction extends Action {
  type: typeof CRUD_UPDATE
}
// export interface UpdateProgressAction { type: typeof CRUD_UPDATE_PROGRESS };
export interface UpdateFailureAction {
  type: typeof CRUD_UPDATE_FAILURE
}
export interface UpdateSuccessAction {
  type: typeof CRUD_UPDATE_SUCCESS
}

// export const crudUpdate = (
//     resource,
//     id,
//     data,
//     previousData,
//     basePath,
//     redirectTo = 'show'
// ) => ({
//     type: CRUD_UPDATE,
//     payload: { id, data, previousData, basePath, redirectTo },
//     meta: { resource, fetch: UPDATE, cancelPrevious: false },
// });

export const CRUD_PATCH = 'JS/CRUD_PATCH'
export const CRUD_PATCH_PROGRESS = 'JS/CRUD_PATCH_PROGRESS'
export const CRUD_PATCH_FAILURE = 'JS/CRUD_PATCH_FAILURE'
export const CRUD_PATCH_SUCCESS = 'JS/CRUD_PATCH_SUCCESS'

export interface PatchAction extends Action {
  type: typeof CRUD_PATCH
}
// export interface PatchProgressAction { type: typeof CRUD_PATCH_PROGRESS };
// export interface PatchFailureAction { type: typeof CRUD_PATCH_FAILURE };
// export interface PatchSuccessAction { type: typeof CRUD_PATCH_SUCCESS };

// export const crudPatch = (
//     resource,
//     id,
//     data,
//     previousData,
//     basePath,
//     redirectTo = 'show'
// ) => ({
//     type: CRUD_PATCH,
//     payload: { id, data, previousData, basePath, redirectTo },
//     meta: { resource, fetch: PATCH, cancelPrevious: false },
// });

export const CRUD_DELETE = 'JS/CRUD_DELETE'
export const CRUD_DELETE_PROGRESS = 'JS/CRUD_DELETE_PROGRESS'
export const CRUD_DELETE_FAILURE = 'JS/CRUD_DELETE_FAILURE'
export const CRUD_DELETE_SUCCESS = 'JS/CRUD_DELETE_SUCCESS'

export interface DeleteAction extends Action {
  type: typeof CRUD_DELETE
}
// export interface DeleteProgressAction { type: typeof CRUD_DELETE_PROGRESS };
// export interface DeleteFailureAction { type: typeof CRUD_DELETE_FAILURE };
// export interface DeleteSuccessAction { type: typeof CRUD_DELETE_SUCCESS };

// export const crudDelete = (
//     resource,
//     id,
//     previousData,
//     basePath,
//     redirectTo = 'list'
// ) => ({
//     type: CRUD_DELETE,
//     payload: { id, previousData, basePath, redirectTo },
//     meta: { resource, fetch: DELETE, cancelPrevious: false },
// });

/**
 * Reference related actions
 */
export const CRUD_GET_MANY = 'JS/CRUD_GET_MANY'
export const CRUD_GET_MANY_PROGRESS = 'JS/CRUD_GET_MANY_PROGRESS'
export const CRUD_GET_MANY_FAILURE = 'JS/CRUD_GET_MANY_FAILURE'
export const CRUD_GET_MANY_SUCCESS = 'JS/CRUD_GET_MANY_SUCCESS'

// export const crudGetMany = (resource, ids) => ({
//     type: CRUD_GET_MANY,
//     payload: { ids },
//     meta: { resource, fetch: GET_MANY, cancelPrevious: false },
// });

export const CRUD_GET_MATCHING = 'JS/CRUD_GET_MATCHING'
export const CRUD_GET_MATCHING_PROGRESS = 'JS/CRUD_GET_MATCHING_PROGRESS'
export const CRUD_GET_MATCHING_FAILURE = 'JS/CRUD_GET_MATCHING_FAILURE'
export const CRUD_GET_MATCHING_SUCCESS = 'JS/CRUD_GET_MATCHING_SUCCESS'

// export const crudGetMatching = (
//     reference,
//     relatedTo,
//     pagination,
//     sort,
//     filter
// ) => ({
//     type: CRUD_GET_MATCHING,
//     payload: { pagination, sort, filter },
//     meta: {
//         resource: reference,
//         relatedTo,
//         fetch: GET_LIST,
//         cancelPrevious: false,
//     },
// });

export const CRUD_GET_MANY_REFERENCE = 'JS/CRUD_GET_MANY_REFERENCE'
export const CRUD_GET_MANY_REFERENCE_PROGRESS =
  'JS/CRUD_GET_MANY_REFERENCE_PROGRESS'
export const CRUD_GET_MANY_REFERENCE_FAILURE =
  'JS/CRUD_GET_MANY_REFERENCE_FAILURE'
export const CRUD_GET_MANY_REFERENCE_SUCCESS =
  'JS/CRUD_GET_MANY_REFERENCE_SUCCESS'

// export const crudGetManyReference = (
//     reference,
//     target,
//     id,
//     relatedTo,
//     pagination,
//     sort,
//     filter
// ) => ({
//     type: CRUD_GET_MANY_REFERENCE,
//     payload: { target, id, pagination, sort, filter },
//     meta: {
//         resource: reference,
//         relatedTo,
//         fetch: GET_MANY_REFERENCE,
//         cancelPrevious: false,
//     },
// });

export type CrudFetchActions =
  | GetListAction
  | GetOneAction
  | CreateAction
  | UpdateAction
  | PatchAction
  | DeleteAction

// export type All = GetListAction
//   | GetListProgressAction
//   | GetListSuccessAction
//   | GetListFailureAction
//   | GetOneAction
//   | GetOneProgressAction
//   | GetOneSuccessAction
//   | GetOneFailureAction
//   | CreateAction
//   | CreateProgressAction
//   | CreateSuccessAction
//   | CreateFailureAction
//   | UpdateAction
//   | UpdateProgressAction
//   | UpdateSuccessAction
//   | UpdateFailureAction
//   | DeleteAction
//   | DeleteProgressAction
//   | DeleteSuccessAction
//   | DeleteFailureAction
//   ;
