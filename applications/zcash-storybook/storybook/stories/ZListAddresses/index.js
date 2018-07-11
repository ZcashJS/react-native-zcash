import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'

import { storiesOf } from '@storybook/react-native'

import store from 'state/teststore'

import ZListAddresses from 'components/ZListAddresses'


storiesOf('ZListAddresses', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Basic', () => 
    <ZListAddresses />
  )
