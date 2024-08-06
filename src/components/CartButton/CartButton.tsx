import { Button } from 'antd'
import styled from 'styled-components'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { MouseEvent } from 'react'

export interface CartButtonProps {
  onClick: (e: MouseEvent<HTMLSpanElement>) => void
}

const StyledCartIcon = styled(ShoppingCartOutlined)`
    &.anticon {
        display: flex !important;
        align-items: center;
        justify-content: center;

        svg {
            width: 24px;
            height: 24px;
            align-self: center;
            color: #067dfe;
        }
`
const CartButton: React.FC<CartButtonProps> = ({ onClick }: CartButtonProps) => {
  return (
    <Button onClick={onClick}>
      <StyledCartIcon></StyledCartIcon>
    </Button>
  )
}

export default CartButton
