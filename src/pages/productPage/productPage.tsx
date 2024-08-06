import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentCurrency, getProduct } from '../../store/selector.ts'
import { addProductAction, getProductByIdAction } from '../../store/action.ts'
import { Layout } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import type { ProductModel } from '../../models/ProductModel.ts'
import CartButton from '../../components/CartButton/CartButton.tsx'

const StyledLayout = styled(Layout)`
  padding: 32px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`
const StyledImg = styled.img`
  width: 320px;
  aspect-ratio: 1/1;
`
const StyledInfo = styled.div`
  flex-grow: 1;
  text-align: left;
`
const StyledPrice = styled.h2``
const ProductPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(getProduct)
  const currentCurrency = useSelector(getCurrentCurrency)
  const addProduct = useCallback((product: ProductModel) => {
    dispatch(addProductAction(product))
  }, [])

  useEffect(() => {
    productId && dispatch(getProductByIdAction(productId))
  }, [productId])

  return (
    <StyledLayout>
      <StyledImg src={product?.image} alt=''></StyledImg>
      <StyledInfo>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <CartButton onClick={() => product && addProduct(product)}></CartButton>
      </StyledInfo>
      <StyledPrice>
        {product?.priceDictionary[currentCurrency]} {t(currentCurrency)}
      </StyledPrice>
      <></>
    </StyledLayout>
  )
}
export default ProductPage
