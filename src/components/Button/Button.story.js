import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from './Button.component'

storiesOf('Button', module)
	.add('default', () => (
		<Button>Submit</Button>
	))
	.add('default secondary', () => (
		<Button color="secondary">Submit</Button>
	))
	.add('small', () => (
		<Button size="small">Submit</Button>
	))
	.add('medium', () => (
		<Button size="medium">Submit</Button>
	))
	.add('large', () => (
		<Button size="large">Submit</Button>
	))
	.add('filled', () => (
		<Button variant="contained">Submit</Button>
	))