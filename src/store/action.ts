import { createAction } from '@reduxjs/toolkit'
import {
  ADD_PRODUCT,
  CHANGE_CURRENCY,
  CREATE_ORDER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  REMOVE_PRODUCT,
  SUB_PRODUCT,
} from './actionTypes.ts'
import type { ProductModel } from '../models/ProductModel.ts'
import type { GeneralErrorPayload } from './utils/index.ts'
import type { OrderModel } from '../models/OrderModel.ts'
import type { CurrencyEnum } from '../enums/currency.enum.ts'

export const getAllProductsAction = createAction(GET_ALL_PRODUCTS.request)
export const getAllProductsSuccess = createAction<ProductModel[]>(GET_ALL_PRODUCTS.success)
export const getAllProductsFailure = createAction<GeneralErrorPayload>(GET_ALL_PRODUCTS.failure)
export const addProductAction = createAction<ProductModel>(ADD_PRODUCT)
export const subProductAction = createAction<ProductModel>(SUB_PRODUCT)
export const removeProductAction = createAction<ProductModel>(REMOVE_PRODUCT)
export const getProductByIdAction = createAction<string>(GET_PRODUCT_BY_ID.request)
export const getProductByIdSuccess = createAction<ProductModel>(GET_PRODUCT_BY_ID.success)
export const getProductByIdFailure = createAction<GeneralErrorPayload>(GET_PRODUCT_BY_ID.failure)
export const createOrderAction = createAction<OrderModel>(CREATE_ORDER.request)
export const createOrderSuccess = createAction(CREATE_ORDER.success)
export const createOrderFailure = createAction<GeneralErrorPayload>(CREATE_ORDER.failure)
export const changeCurrencyAction = createAction<CurrencyEnum>(CHANGE_CURRENCY)
