import React from 'react'

import { storiesOf } from '@storybook/react-native'
import DisplayAddress from 'components/stateless/DisplayAddress'


storiesOf('DisplayAddress', module)
  .add('Basic', () =>
    <DisplayAddress address={"t1LSEkhtoKf77krT5zuXnmzM8huE8SUECtU"} />
  )
