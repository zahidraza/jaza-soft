export const DECLARE_RESOURCES = 'JS/DECLARE_RESOURCES'

export interface Payload {
  name: string
  reducerReq?: boolean
  referenceResource?: string
  icon?: JSX.Element
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
