import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

const MyCard = ({ children }) => (
	<Card style={{ marginBottom: '10px' }}>
		<CardContent>
			{children}
		</CardContent>
	</Card>
);

export default MyCard;

MyCard.propTypes = {
	children: PropTypes.node.isRequired,
};
