import React from 'react'
import { storiesOf } from '@storybook/react'

import Checkbox from './Checkbox.component'

const state = {
	searchInTags: ''
}

storiesOf('Checkbox', module)
	.add('default', () => (
		<Checkbox state={state}></Checkbox>
	))
	.add('with label', () => (
		<Checkbox state={state} label='text'></Checkbox>
	))

