import type { ProductModel } from '../models/ProductModel.ts'
import type { OrderModel, ProductDictionary } from '../models/OrderModel.ts'
import type { CurrencyEnum } from '../enums/currency.enum.ts'
import type { WithCallback } from './utils/index.ts'

export interface ProductsState {
  products: ProductModel[] | null
  product: ProductModel | null
  currentCurrency: CurrencyEnum
  pending: boolean
  error: string | null
}

export interface CartState {
  pending: boolean
  error: string | null
  productDictionary: ProductDictionary
  order: OrderModel | null
}

export interface CreateOrderPayload extends WithCallback<OrderModel> {
  order: OrderModel
}
