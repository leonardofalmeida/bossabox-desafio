import React from 'react';
import PropTypes from 'prop-types';
import { InputCheckbox } from './Checkbox.style';

const Checkbox = ({ handleInputChange, state }) => (
	<>
		<label style={{ cursor: 'pointer' }} htmlFor='tags'>
			<InputCheckbox
				type='checkbox'
				color='primary'
				name='searchInTags'
				checked={state.searchInTags}
				onChange={handleInputChange}
				id='tags'
				style={{ cursor: 'pointer' }}
			/>
			Search only in tags
		</label>
	</>
);

export default Checkbox;

Checkbox.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	state: PropTypes.shape({
		searchInTags: PropTypes.bool.isRequired,
	}).isRequired,
};
