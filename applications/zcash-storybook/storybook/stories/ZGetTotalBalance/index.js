import React from 'react'
import { Provider } from 'react-redux'

import { storiesOf } from '@storybook/react-native'

import ZGetTotalBalance from 'components/ZGetTotalBalance'

// TODO: abstract all of this redux testing stuff away properly
import getStore from 'zcash-redux/getStore'

const testStore = getStore({
  zcash_auth: {
    username: 'z',
    password: 'a',
  },
  zcash_client_config: {
    url: 'http://localhost:8232',
  }
})


storiesOf('ZGetTotalBalance', module)
  .addDecorator(story => <Provider store={testStore}>{story()}</Provider>)
  .add('Basic', () =>
    <ZGetTotalBalance />
  )
