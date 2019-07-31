import React from 'react';
import PropTypes from 'prop-types';
import { InputCheckbox } from './Checkbox.style';

// import { Container } from './styles';

export default function CheckBox({ handleInputChange, state }) {
	return (
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
}

CheckBox.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	state: PropTypes.shape({
		searchInTags: PropTypes.bool.isRequired,
	}).isRequired,
};
