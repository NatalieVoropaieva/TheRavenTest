import {
  createOrderAction,
  createOrderFailure,
  createOrderSuccess,
  getAllProductsFailure,
  getAllProductsSuccess,
  getProductByIdAction,
  getProductByIdFailure,
  getProductByIdSuccess,
} from './action.ts'
import { createOrder, getAllProducts, getProductById } from '../api/api.ts'
import type { ProductModel } from '../models/ProductModel.ts'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { CREATE_ORDER, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from './actionTypes.ts'

function* getAllProductsSaga() {
  try {
    const res: ProductModel[] = yield call(getAllProducts)
    yield put(getAllProductsSuccess(res))
  } catch (e: any) {
    yield put(getAllProductsFailure({ error: e.message }))
  }
}

function* getProductByIdSaga(action: ReturnType<typeof getProductByIdAction>) {
  try {
    const res: ProductModel = yield call(getProductById, action.payload)
    yield put(getProductByIdSuccess(res))
  } catch (e: any) {
    yield put(getProductByIdFailure({ error: e.message }))
  }
}

function* createOrderSaga(action: ReturnType<typeof createOrderAction>) {
  try {
    yield call(createOrder, action.payload.order)
    yield put(createOrderSuccess())
    action.payload?.callback && action.payload?.callback(action.payload.order)
  } catch (e: any) {
    yield put(createOrderFailure({ error: e.message }))
  }
}

function* saga() {
  yield all([takeLatest(GET_ALL_PRODUCTS.request, getAllProductsSaga)])
  yield all([takeLatest(GET_PRODUCT_BY_ID.request, getProductByIdSaga)])
  yield all([takeLatest(CREATE_ORDER.request, createOrderSaga)])
}

export default saga
