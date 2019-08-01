import React from 'react'
import { storiesOf } from '@storybook/react'

import EmptyMessage from './EmptyMessage.component'

storiesOf('Empty message', module)
	.add('default', () => (
		<EmptyMessage></EmptyMessage>
	))
	.add('with text', () => (
		<EmptyMessage emptyText={'text'}></EmptyMessage>
	))

