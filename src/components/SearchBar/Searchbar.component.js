import React from 'react';
import {
	InputAdornment, IconButton, Paper, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';


const Searchbar = ({ handleInputChange, handleSearch }) => (
	<form>
		<Paper>
			<TextField
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
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Paper>
	</form>
);

export default Searchbar;

Searchbar.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
};
