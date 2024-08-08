import { createAsyncActionType } from './utils/index.ts'

export const GET_ALL_PRODUCTS = createAsyncActionType('GET_ALL_PRODUCTS')
export const GET_PRODUCT_BY_ID = createAsyncActionType('GET_PRODUCT_BY_ID')
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SUB_PRODUCT = 'SUB_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const CREATE_ORDER = createAsyncActionType('CREATE_ORDER')
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CLEAR_CART = 'CLEAR_CART'
