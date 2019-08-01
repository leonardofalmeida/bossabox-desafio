import React from 'react';
import { InputAdornment, IconButton, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SearchbarComIcone, IconeSearch, Form } from './Searchbar.style';

export default function Searchbar({ handleInputChange, handleSearch }) {
	return (
		<Form>
			<Paper>
				<SearchbarComIcone
					placeholder='Search for a tool'
					id='outlined-simple-start-adornment'
					name='search'
					autoComplete='ava'
					onChange={handleInputChange}
					/* Desabilita o enter na pesquisa */
					onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<IconButton onClick={handleSearch} aria-label='search'>
									<IconeSearch />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Paper>
		</Form>
	);
}

Searchbar.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
};
