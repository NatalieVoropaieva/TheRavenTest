import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Card, GetProps, Input, Layout, Rate } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import reactImg from '../../assets/react.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCurrency, getProductsList } from '../../store/selector.ts'
import { addProductAction, getAllProductsAction } from '../../store/action.ts'
import type { ProductModel } from '../../models/ProductModel.ts'
import CartButton from '../../components/CartButton/CartButton.tsx'

const { Meta } = Card
const { Search } = Input
type SearchProps = GetProps<typeof Input.Search>
const StyledLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  padding: 32px;
  width: 100%;
  flex-direction: column;
`
const StyledSearch = styled(Search)`
  max-width: 320px;
`
const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 256px);
  padding-top: 16px;
  gap: 16px;

  justify-content: space-between;
`
const StyledCard = styled(Card)`
  max-width: 256px;
  padding: 16px;
  padding-bottom: 0;
  cursor: pointer;
  width: 100%;
  min-width: 128px;
  flex-grow: 1;
  flex-shrink: 1;
  max-height: 530px;

  & .ant-card-meta-description > div {
    overflow: hidden;
  }

  & .ant-card-meta-description > div > p {
    overflow: hidden;
    display: -webkit-box;
    max-width: 320px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  &.ant-card .ant-card-actions > li > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const StyledImg = styled.img`
  height: 224px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 16px !important;
  overflow: hidden;

  &.ant-card-cover {
    border-radius: 16px;
  }
`
const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const onSearch: SearchProps['onSearch'] = (value, _e) => setSearch(value)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector(getProductsList)
  const currentCurrency = useSelector(getCurrentCurrency)
  useEffect(() => {
    if (productList === null) {
      dispatch(getAllProductsAction())
    }
  }, [productList])

  const addProduct = useCallback((e: MouseEvent<HTMLSpanElement>, product: ProductModel) => {
    e.stopPropagation()
    dispatch(addProductAction(product))
  }, [])

  return (
    <StyledLayout>
      <StyledSearch placeholder={t('search')} onSearch={onSearch} enterButton size={'large'} />
      <StyledCardsContainer>
        {productList
          ?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((product) => {
            return (
              <StyledCard
                cover={
                  <StyledImg src={`${product.image === '' ? reactImg : product.image}`} alt='' />
                }
                actions={[<CartButton onClick={(e) => addProduct(e, product)}></CartButton>]}
                onClick={() => navigate(`product/${product.id}`)}
                key={product.id}
              >
                <Meta
                  title={product.name}
                  description={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <p style={{ maxWidth: '100%' }}>{product.description}</p>
                      <Rate value={product.rate} allowHalf disabled></Rate>
                      <h3 style={{ color: 'red', alignSelf: 'flex-end' }}>
                        {product.priceDictionary[currentCurrency]} {t(currentCurrency)}
                      </h3>
                    </div>
                  }
                ></Meta>
              </StyledCard>
            )
          })}
      </StyledCardsContainer>
    </StyledLayout>
  )
}

export default ProductsPage
