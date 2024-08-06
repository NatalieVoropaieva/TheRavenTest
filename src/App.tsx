import './App.scss'
import { Badge, Layout, Select } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemsAmount, getCurrentCurrency } from './store/selector.ts'
import { CurrencyEnum } from './enums/currency.enum.ts'
import { changeCurrencyAction } from './store/action.ts'

const { Header, Content } = Layout
const StyledLayout = styled(Layout)`
  height: 100%;
  overflow-x: hidden;
`
const StyledHeader = styled(Header)`
  background: #067dfe;
  color: #fff;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`
const StyledLogo = styled.h2`
  color: #fff;
  cursor: pointer;
`
const StyledCartIcon = styled(ShoppingCartOutlined)`
  cursor: pointer;
  color: #fff;

  svg {
    height: 32px;
    width: 32px;
  }
`
const StyledContent = styled(Content)`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 64px;
  width: 100%;
`
const StyledHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

function App() {
  const navigate = useNavigate()
  const itemsAmount = useSelector(getCartItemsAmount)
  const badgeCount = +itemsAmount
  const dispatch = useDispatch()
  const currentCurrency = useSelector(getCurrentCurrency)

  return (
    <StyledLayout>
      <StyledHeader color={'#067dfe'}>
        <StyledLogo onClick={() => navigate('/')}>TheRavenTest</StyledLogo>
        <StyledHeaderButtons>
          <Select
            style={{ width: 100 }}
            defaultValue={CurrencyEnum.UAH}
            value={currentCurrency}
            onChange={(value) => dispatch(changeCurrencyAction(value))}
            options={[
              { label: CurrencyEnum.UAH, value: CurrencyEnum.UAH },
              { label: CurrencyEnum.USD, value: CurrencyEnum.USD },
            ]}
          ></Select>
          <Badge count={badgeCount}>
            <StyledCartIcon onClick={() => navigate('/order')} />
          </Badge>
        </StyledHeaderButtons>
      </StyledHeader>

      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  )
}

export default App
