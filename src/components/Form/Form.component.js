import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../Button/Button.component';

export default function Form({ handleSubmit, handleChange }) {
	return (
		<form onSubmit={handleSubmit}>

	<label htmlFor='name'>Tool name: </label>
			<input id='name' name='name' onChange={handleChange} />

			<label htmlFor='name'>Tool link: </label>
			<input id='name' name='link' onChange={handleChange} />

			<label htmlFor='name'>Tool description: </label>
			<input id='name' name='description' onChange={handleChange} />

			<label htmlFor='name'>Tags: </label>
			<input id='name' name='tags' onChange={handleChange} />

			<MyButton variant='contained' name='Add tool' />

		</form>
	);
}

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
};
