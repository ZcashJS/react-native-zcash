import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'

import { storiesOf } from '@storybook/react-native'

import getStore from 'state/getStore'

import ZListAddresses from 'components/ZListAddresses'

console.error(process.env)

const testStore = getStore({
  // TODO get these from environment
  auth: {
    username: process.env.ZCASH_RPC_TEST_USERNAME || '',
    password: process.env.ZCASH_RPC_TEST_PASSWORD || '',
  },
  client_config: {
    url: 'http://localhost:8232',
  }
})


storiesOf('ZListAddresses', module)
  .addDecorator(story => <Provider store={testStore}>{story()}</Provider>)
  .add('Basic', () => 
    <ZListAddresses />
  )
