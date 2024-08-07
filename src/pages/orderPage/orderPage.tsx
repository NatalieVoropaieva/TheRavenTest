import React from 'react'
import { Button, Input, Layout } from 'antd'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { FormikProps, useFormik } from 'formik'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCartItemsDict,
  getCartItemsTotalPrice,
  getCurrentCurrency,
} from '../../store/selector.ts'
import {
  addProductAction,
  createOrderAction,
  removeProductAction,
  subProductAction,
} from '../../store/action.ts'
import { useTranslation } from 'react-i18next'
import type { AppDispatch } from '../../store/index.ts'
import { CurrencyEnum } from '../../enums/currency.enum.ts'

const StyledLayout = styled(Layout)`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 32px;
  padding: 32px;
  flex-wrap: wrap;
`
const ProductsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledProductCard = styled.div`
  display: flex;
  padding: 16px;
  border-radius: 8px;
  position: relative;
  height: 128px;
  background-color: #fff;
  box-shadow: #ababab 0 0 7px -1px;
  gap: 16px;
`
const StyledImage = styled.img`
  aspect-ratio: 1/1;
  height: 100%;
  object-fit: cover;
`
const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > h3,
  & > p {
    text-align: left;
    overflow: hidden;
    display: -webkit-box;
    max-width: 500px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`
const StyledAction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StyledButtons = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap-reverse;
  width: 88px;
  justify-content: end;

  button {
    width: 32px;
  }
`
const StyledPrice = styled.h2`
  align-self: flex-end;
`
const StyledTotal = styled.h1`
  text-align: right;
  align-items: center;
`
const OrderInfoContainer = styled.div`
  background-color: #fff;
  box-shadow: #ababab 0 0 7px -1px;
  width: 320px;
  max-height: 392px;
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;

    & > label > p {
      margin-bottom: 8px;
      text-align: left;
    }
  }
`

interface OrderValues {
  name: string
  surname: string
  phone: string
  address: string
}

interface OrderProps {
  initialValues?: OrderValues
  loading?: boolean
}

const defaultValues = {
  name: '',
  surname: '',
  phone: '',
  address: '',
}
// const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const schema = yup
  .object()
  .shape({
    name: yup.string().required('name_required'),
    surname: yup.string().required('surname_required'),
    phone: yup.string().required('phone_required'),
    address: yup.string().required('address_required'),
  })
  .required() as ObjectSchema<OrderValues>

const OrderPage: React.FC<OrderProps> = ({ initialValues }: OrderProps) => {
  const productDictionary = useSelector(getCartItemsDict)
  const totalSum = useSelector(getCartItemsTotalPrice)
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const currentCurrency = useSelector(getCurrentCurrency)

  const onSubmit = (values: OrderValues) => {
    dispatch(
      createOrderAction({
        name: values.name,
        surname: values.surname,
        phone: values.phone,
        address: values.address,
        totalPrice: +totalSum,
        currency: CurrencyEnum.UAH,
        productsDictionary: productDictionary,
      }),
    )
  }

  const formik: FormikProps<OrderValues> = useFormik<OrderValues>({
    initialValues: initialValues ? initialValues : defaultValues,
    validationSchema: schema,
    onSubmit,
  })
  console.log(formik.values)
  return (
    <StyledLayout>
      <ProductsContainer>
        {Object.values(productDictionary).map((product) => {
          return (
            <StyledProductCard key={product.product.id}>
              <StyledImage src={product.product.image} alt=''></StyledImage>
              <StyledInfo>
                <h3>{product.product.name}</h3>
                <p>{product.product.description}</p>
              </StyledInfo>
              <StyledAction>
                <StyledButtons>
                  <Button onClick={() => dispatch(subProductAction(product.product))}>-</Button>
                  {product.amount}
                  <Button onClick={() => dispatch(addProductAction(product.product))}>+</Button>
                  <Button onClick={() => dispatch(removeProductAction(product.product))}>X</Button>
                </StyledButtons>
                <StyledPrice>
                  {product.product.priceDictionary[currentCurrency]} {t(currentCurrency)}
                </StyledPrice>
              </StyledAction>
            </StyledProductCard>
          )
        })}
        <StyledTotal>
          {t('total')}: {+totalSum} {t(currentCurrency)}
        </StyledTotal>
      </ProductsContainer>
      <OrderInfoContainer>
        <form onSubmit={formik.handleSubmit}>
          <label>
            <p>{t('name')}</p>
            <Input
              size={'large'}
              value={formik.values.name}
              name={'name'}
              onChange={formik.handleChange}
            ></Input>
          </label>
          <label>
            <p>{t('surname')}</p>
            <Input
              size={'large'}
              value={formik.values.surname}
              name={'surname'}
              onChange={formik.handleChange}
            ></Input>
          </label>
          <label>
            <p>{t('phone')}</p>
            <Input
              size={'large'}
              value={formik.values.phone}
              name={'phone'}
              onChange={formik.handleChange}
            ></Input>
          </label>
          <label>
            <p>{t('address')}</p>
            <Input
              size={'large'}
              value={formik.values.address}
              name={'address'}
              onChange={formik.handleChange}
            ></Input>
          </label>

          <Button type={'primary'} htmlType={'submit'} color={'#067dfe'} size={'large'}>
            {t('submit')}
          </Button>
        </form>
      </OrderInfoContainer>
    </StyledLayout>
  )
}
export default OrderPage
