import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const MyButton = ({
	variant, color, size, name, children, onClick,
}) => (
		<Button onClick={onClick} size={size} variant={variant} color={color}>
			{children}
			{name}
		</Button>
	);

export default MyButton;

MyButton.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node,
	variant: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
	onClick: PropTypes.func,
};

MyButton.defaultProps = {
	variant: 'text',
	color: 'primary',
	size: 'medium',
	children: null,
	onClick: () => { },
};

rcs