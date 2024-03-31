import { FC } from 'react'

import { Container, Info, Description, Label } from './styles'
export type LocationInfoProps = {
  label: string
  description: string
}
export const LocationInfo: FC<LocationInfoProps> = ({ label, description }) => {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
