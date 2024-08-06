import type { ProductModel } from './ProductModel.ts'
import type { CurrencyEnum } from '../enums/currency.enum.ts'

export interface ProductDictionary {
  [key: string]: {
    amount: number
    product: ProductModel
  }
}

export interface OrderModel {
  name: string
  surname: string
  phone: string
  address: string
  productsDictionary: ProductDictionary
  totalPrice: number
  currency: CurrencyEnum
}
