import React from 'react'
import { Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'

import './DisplayAddress'
import './DisplayBalance'
import './ZGetTotalBalance'
import './ZListAddresses'

import zest from 'zest'

storiesOf('Zest', module)
  .add('can import', () =>
    <Text>{ zest }</Text>
  )
