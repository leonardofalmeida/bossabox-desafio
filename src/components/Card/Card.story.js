import React from 'react'
import { storiesOf } from '@storybook/react'

import Card from './Card.component'

storiesOf('Card', module)
	.add('default', () => (
		<Card></Card>
	))
	.add('with content', () => (
		<Card>
			<p>text</p>
		</Card>
	))

