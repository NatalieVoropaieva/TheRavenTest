import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import {
  addProductAction,
  changeCurrencyAction,
  createOrderAction,
  createOrderFailure,
  createOrderSuccess,
  getAllProductsAction,
  getAllProductsFailure,
  getAllProductsSuccess,
  getProductByIdAction,
  getProductByIdFailure,
  getProductByIdSuccess,
  removeProductAction,
  subProductAction,
} from './action.ts'
import type { CartState, ProductsState } from './types.ts'
import type { ProductDictionary } from '../models/OrderModel.ts'
import { CurrencyEnum } from '../enums/currency.enum.ts'

const CART_KEY = 'cart'
const CURRENCY_KEY = 'currency'

const productsInitial: ProductsState = {
  product: null,
  products: null,
  pending: true,
  currentCurrency: (sessionStorage.getItem(CURRENCY_KEY) as CurrencyEnum) ?? CurrencyEnum.UAH,
  error: null,
}
const cartInitial: CartState = {
  productDictionary:
    sessionStorage.getItem(CART_KEY) != null
      ? JSON.parse(sessionStorage.getItem(CART_KEY) ?? '')
      : {},
  order: null,
  pending: true,
  error: null,
}

const productsReducer = createReducer<ProductsState>(productsInitial, (builder) => {
  builder
    .addCase(getAllProductsAction, (state) => {
      return { ...state, pending: true }
    })
    .addCase(getAllProductsSuccess, (state, action) => {
      return {
        ...state,
        pending: false,
        products: action.payload,
      }
    })
    .addCase(getAllProductsFailure, (state, action) => {
      return { ...state, pending: false, error: action.payload.error }
    })
    .addCase(getProductByIdAction, (state) => {
      return {
        ...state,
        pending: true,
      }
    })
    .addCase(getProductByIdSuccess, (state, action) => {
      return {
        ...state,
        pending: false,
        product: action.payload,
      }
    })
    .addCase(getProductByIdFailure, (state, action) => {
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      }
    })
    .addCase(changeCurrencyAction, (state, action) => {
      sessionStorage.setItem(CURRENCY_KEY, action.payload)
      return {
        ...state,
        currentCurrency: action.payload,
      }
    })
})

const cartReducer = createReducer<CartState>(cartInitial, (builder) => {
  builder
    .addCase(addProductAction, (state, action) => {
      let dict: ProductDictionary = { ...state.productDictionary }

      if (dict[action.payload.id]) {
        dict[action.payload.id] = {
          ...dict[action.payload.id],
          amount: dict[action.payload.id].amount + 1,
        }
      } else {
        dict[action.payload.id] = { amount: 1, product: action.payload }
      }
      sessionStorage.setItem(CART_KEY, JSON.stringify(dict))

      return {
        ...state,
        productDictionary: { ...dict },
      }
    })
    .addCase(subProductAction, (state, action) => {
      let dict: ProductDictionary = { ...state.productDictionary }

      if (dict[action.payload.id].amount > 1) {
        dict[action.payload.id] = {
          ...dict[action.payload.id],
          amount: dict[action.payload.id].amount - 1,
        }
      } else {
        delete dict[action.payload.id]
      }
      sessionStorage.setItem(CART_KEY, JSON.stringify(dict))
      return {
        ...state,
        productDictionary: { ...dict },
      }
    })
    .addCase(removeProductAction, (state, action) => {
      let dict: ProductDictionary = { ...state.productDictionary }
      delete dict[action.payload.id]
      sessionStorage.setItem(CART_KEY, JSON.stringify(dict))
      return {
        ...state,
        productDictionary: { ...dict },
      }
    })
    .addCase(createOrderAction, (state) => {
      return {
        ...state,
        pending: true,
      }
    })
    .addCase(createOrderSuccess, (state) => {
      return {
        ...state,
        pending: false,
      }
    })
    .addCase(createOrderFailure, (state) => {
      return {
        ...state,
        pending: false,
        error: 'error',
      }
    })
})
const reducer = combineReducers({
  productsReducer,
  cartReducer,
})

export default reducer
