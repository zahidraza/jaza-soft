export const TOGGLE_SIDEBAR = 'JS/TOGGLE_SIDEBAR'
export interface ToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR
}
export const toggleSidebar = (): ToggleSidebarAction => ({
  type: TOGGLE_SIDEBAR
})

export const SIDEBAR_VISIBILITY = 'JS/SIDEBAR_VISIBILITY'
export interface SidebarVisibiltyAction {
  type: typeof SIDEBAR_VISIBILITY
  payload: boolean
}
export const setSidebarVisibility = (
  isOpen: boolean
): SidebarVisibiltyAction => ({
  type: SIDEBAR_VISIBILITY,
  payload: isOpen
})

export const REFRESH_VIEW = 'JS/REFRESH_VIEW'
export interface RefreshViewAction {
  type: typeof REFRESH_VIEW
}
export const refreshView = (): RefreshViewAction => ({ type: REFRESH_VIEW })

export type All =
  | ToggleSidebarAction
  | SidebarVisibiltyAction
  | RefreshViewAction
