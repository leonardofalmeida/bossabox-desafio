import React from 'react';
import PropTypes from 'prop-types';
import { Title, Subtitle } from './Header.style';

export default function Header({ title, subtitle }) {
	return (
		<>
			<Title>{title}</Title>
			<Subtitle>{subtitle}</Subtitle>
		</>
	);
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

Header.defaultProps = {
	subtitle: '',
};
