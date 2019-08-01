import React from 'react';
import PropTypes from 'prop-types';

const EmptyMessage = ({ emptyText }) => (
	<div>
		<h4>{emptyText}</h4>
	</div>
);

EmptyMessage.propTypes = {
	emptyText: PropTypes.string,
};

EmptyMessage.defaultProps = {
	emptyText: '--',
};

export default EmptyMessage;
