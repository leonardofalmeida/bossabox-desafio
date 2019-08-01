import React from 'react'
import { storiesOf } from '@storybook/react'

import TitleGroup from './TitleGroup.component'

storiesOf('Title group', module)
	.add('default', () => (
		<TitleGroup title={'Title'}></TitleGroup>
	))
	.add('with subtitle', () => (
		<TitleGroup title={'Title'} subtitle={'Your subtitle here'}></TitleGroup>
	))

