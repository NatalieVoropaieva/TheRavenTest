export interface GeneralErrorPayload {
  error: string
}

export interface AsyncActionType {
  request: string
  success: string
  failure: string
}

export const createAsyncActionType = (type: string): AsyncActionType => {
  return {
    request: `${type}_REQUEST`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`,
  }
}
