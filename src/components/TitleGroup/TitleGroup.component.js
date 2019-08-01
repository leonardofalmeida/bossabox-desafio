import React from 'react';
import PropTypes from 'prop-types';
import { Title, Subtitle } from './TitleGroup.style';

const TitleGroup = ({ title, subtitle }) => (
	<>
		<Title>{title}</Title>
		<Subtitle>{subtitle}</Subtitle>
	</>
);

export default TitleGroup;

TitleGroup.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

TitleGroup.defaultProps = {
	subtitle: '',
};
