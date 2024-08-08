import { Layout } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const StyledLayout = styled(Layout)`
  padding: 32px;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & > p {
    font-size: 16px;
  }
`
const successPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <StyledLayout>
      <h1>{t('success')}</h1>
      <p>{t('success_text')}</p>
    </StyledLayout>
  )
}
export default successPage
