import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';

export const DatePicker = ({ label, date, setDate }) => {
    const handleDate = newValue => {
        setDate(newValue);
    };

    return (
        <DateTimePicker
            renderInput={props => <TextField {...props} />}
            label={label}
            value={date}
            onChange={newValue => {
                handleDate(newValue);
            }}
        />
    );
};
