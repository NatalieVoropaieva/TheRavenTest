export interface GeneralErrorPayload {
  error: string
}

export interface AsyncActionType {
  request: string
  success: string
  failure: string
}

export interface WithCallback<T> {
  callback?: (payload: T) => void
}

export const createAsyncActionType = (type: string): AsyncActionType => {
  return {
    request: `${type}_REQUEST`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`,
  }
}
