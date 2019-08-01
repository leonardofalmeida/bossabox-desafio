import React from 'react'
import { storiesOf } from '@storybook/react'

import Searchbar from './Searchbar.component'

storiesOf('Searchbar', module)
	.add('default', () => (
		<Searchbar></Searchbar>
	))
	.add('with placeholder', () => (
		<Searchbar placeholder={'Your placeholder here'}></Searchbar>
	))

