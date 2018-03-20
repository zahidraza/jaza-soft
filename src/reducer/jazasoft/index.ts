import { combineReducers, AnyAction } from 'redux'
import resources, { State as ResourceState } from './resource'
import loading, { State as LoadingState } from './loading'
import notification, { State as NfnState } from './notification'
// import references from './references';
import saving, { State as SavingState } from './saving'
import ui, { State as UiState } from './ui'
import { DataType } from '../../types'

export interface State<T extends DataType> {
  resources: ResourceState<T>
  loading: LoadingState
  notification: NfnState
  saving: SavingState
  ui: UiState
}

export default combineReducers<State<DataType>>({
  resources,
  loading,
  notification,
  // references,
  saving,
  ui
})

// export const getResources = state => innerGetResources(state.resources);
