import type { RootState } from './index.ts'
import { createSelector } from '@reduxjs/toolkit'
import type { ProductModel } from '../models/ProductModel.ts'

const getProducts = (state: RootState) => state.productsReducer
const getCart = (state: RootState) => state.cartReducer

export const getProductsList = createSelector(getProducts, (state) => state.products)
export const getProduct = createSelector(getProducts, (state) => state.product)
export const getProductsPending = createSelector(getProducts, (state) => state.pending)
export const getCurrentCurrency = createSelector(getProducts, (state) => state.currentCurrency)
export const getCartItemsAmount = createSelector(getCart, (state) =>
  Object.values(state.productDictionary).reduce((count, product) => {
    return count + product.amount
  }, 0),
)
export const getCartItemsTotalPrice = createSelector(
  (state: RootState) => state,
  (state: RootState) =>
    Object.values(state.cartReducer.productDictionary).reduce(
      (
        price: number,
        product: {
          amount: number
          product: ProductModel
        },
      ) => {
        return (
          price +
          product.amount * product.product.priceDictionary[state.productsReducer.currentCurrency]
        )
      },
      0,
    ),
)
export const getCartItemsDict = createSelector(getCart, (state) => state.productDictionary)
