import { configureStore, Tuple } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducer from './reducer.ts'
import createSagaMiddleware from 'redux-saga'
import saga from './saga.ts'

const sagaMiddleware = createSagaMiddleware()
let middleware: Tuple<any>
if (import.meta.env.NODE_ENV === 'development') {
  middleware = new Tuple(sagaMiddleware, logger)
} else {
  middleware = new Tuple(sagaMiddleware)
}

const store = configureStore({
  reducer: reducer,
  middleware: () => middleware,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

sagaMiddleware.run(saga)
export default store
