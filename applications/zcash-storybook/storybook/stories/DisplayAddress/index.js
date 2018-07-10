import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { storiesOf } from '@storybook/react-native'

import DisplayAddress from 'components/DisplayAddress'


storiesOf('DisplayAddress', module)
  .add('Basic', () => 
    <DisplayAddress address={"t1LSEkhtoKf77krT5zuXnmzM8huE8SUECtU"} />
  )
