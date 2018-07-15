import React from 'react'
import { Provider } from 'react-redux'

import { storiesOf } from '@storybook/react-native'

import ListTransactions from 'components/stateful/ListTransactions'

// TODO: abstract all of this redux testing stuff away properly
import getStore from 'state/getStore'

const testStore = getStore({
  auth: {
    username: 'z',
    password: 'a',
  },
  client_config: {
    url: 'http://localhost:8232',
  }
})


storiesOf('ListTransactions', module)
  .addDecorator(story => <Provider store={testStore}>{story()}</Provider>)
  .add('Basic', () =>
    <ListTransactions />
  )
