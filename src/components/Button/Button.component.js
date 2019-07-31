import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function MyButton({
	variant, color, size, name, children, onClick,
}) {
	return (
		<Button onClick={onClick} size={size} variant={variant} color={color}>
			{children}
			{name}
		</Button>
	);
}

MyButton.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node,
	variant: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
};

MyButton.defaultProps = {
	variant: 'text',
	color: 'primary',
	size: 'medium',
	children: null,
};
