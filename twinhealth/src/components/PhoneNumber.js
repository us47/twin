import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function PhoneNumber({ label, onChange, onBlur, onFocus, helperText, error }) {
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    useEffect(() => {
        onChange(phoneNumber)
    }, [phoneNumber]);
    return (
        <TextField
            label={label}
            variant="outlined"
            value={phoneNumber}
            onChange={handleChange}
            InputProps={{
                style: { height: 50 }
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            helperText={helperText}
            error={error}
        />
    );
}
