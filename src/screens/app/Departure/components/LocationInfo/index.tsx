import React, { FC } from 'react'

import { Container, Info, Description, Label } from './styles'
import { IconBox, IconBoxProps } from '~/components/IconBox'

export type LocationInfoProps = {
  label: string
  description: string
}
type Props = LocationInfoProps & {
  icon: IconBoxProps
}
export const LocationInfo: FC<Props> = ({ label, icon, description }) => {
  return (
    <Container>
      <IconBox icon={icon} />
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
