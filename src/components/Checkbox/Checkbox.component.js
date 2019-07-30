import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

// import { Container } from './styles';

export default function CheckBox() {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    value="checkedB"
                    color="primary"
                />
            }
            label="Search in tags only"
        />
    );
}
