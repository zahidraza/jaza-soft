export const DECLARE_RESOURCES = 'JS/DECLARE_RESOURCES'

export interface Payload {
  name: string
}

export interface DeclareResourceAction {
  type: typeof DECLARE_RESOURCES
  payload: Payload[]
}

export const declareResources = (
  resources: Payload[]
): DeclareResourceAction => ({
  type: DECLARE_RESOURCES,
  payload: resources
})

export type All = DeclareResourceAction
