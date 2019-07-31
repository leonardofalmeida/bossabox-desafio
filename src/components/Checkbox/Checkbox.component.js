import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { InputCheckbox } from './Checkbox.style';

// import { Container } from './styles';

export default function CheckBox({ handleInputChange, state }) {
    return (
        <>
            <InputCheckbox
                type='checkbox'
                color="primary"
                name="searchInTags"
                checked={state.searchInTags}
                onChange={handleInputChange}
                id='tags'
                style={{ cursor: 'pointer' }}
            />
            <label style={{ cursor: 'pointer' }} htmlFor='tags'>Search only in tags</label>
        </>
    );
}
