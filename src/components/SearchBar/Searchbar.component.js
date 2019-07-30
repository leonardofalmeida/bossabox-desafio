import React from 'react';
import { InputAdornment } from '@material-ui/core';
import { SearchbarComIcone, IconeSearch } from './Searchbar.style';

export default function Searchbar() {
    return (
        <SearchbarComIcone
            placeholder='Search for a tool'
            id="outlined-simple-start-adornment"
            variant="outlined"
            InputProps={{
                startAdornment: <InputAdornment position="start"><IconeSearch /></InputAdornment>,
            }}
        />
    );
}
