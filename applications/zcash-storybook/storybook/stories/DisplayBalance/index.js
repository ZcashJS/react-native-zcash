import React from 'react'

import { storiesOf } from '@storybook/react-native'
import DisplayBalance from 'components/DisplayBalance'


storiesOf('DisplayBalance', module)
  .add('Basic', () => 
    <DisplayBalance 
      name={'Display z_gettotalbalance'}
      balance={{      
        transparent: 0.99,
        private: 42.424242,
        total: 43.414242,
      }} 
    />
  )
