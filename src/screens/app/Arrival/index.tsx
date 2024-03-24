import { FC } from 'react'

import { Header } from '~/components/Header'
import { Body, Container, Label, LicensePlate, Purpose, Footer } from './styles'

import { AppScreenProps } from '~/routes/app.routes'
import { Button } from '~/components/Button'

type Props = AppScreenProps<'arrival'>
export const Arrival: FC<Props> = ({ route: { params } }) => {
  const veihcleId = params.id
  return (
    <Container>
      <Header title="Arrival" />

      <Body>
        <Label>License plate</Label>
        <LicensePlate>vddud-12312</LicensePlate>

        <Label>Purpose</Label>
        <Purpose>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
          numquam, illum accusantium, autem asperiores velit inventore
          laudantium nihil quos officiis porro, libero magnam molestias. Id
          molestias dolores quas nihil dolorum.
        </Purpose>
      </Body>
      <Footer>
        <Button label="Register Arrival" />
      </Footer>
    </Container>
  )
}
