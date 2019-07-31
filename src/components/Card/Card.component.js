import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Card.style';

export default function MyCard({ children }) {
	return (
		<Card style={{ marginBottom: '10px' }}>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
}


MyCard.propTypes = {
	children: PropTypes.node.isRequired,
};
