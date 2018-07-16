import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'

import { storiesOf } from '@storybook/react-native'

import getStore from 'zcash-redux/getStore'

import ZListAddresses from 'components/ZListAddresses'

const testStore = getStore({
  // TODO get these from environment
  zcash_auth: {
    username: 'z',
    password: 'a',
  },
  zcash_client_config: {
    url: 'http://localhost:8232',
  }
})


storiesOf('ZListAddresses', module)
  .addDecorator(story => <Provider store={testStore}>{story()}</Provider>)
  .add('Basic', () =>
    <ZListAddresses />
  )
