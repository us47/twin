import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function FullName({ label, value, onChange, onBlur, onFocus, helperText }) {

    const [fullName, setFullName] = React.useState('');
    const [nameHelperText, setNameHelperText] = React.useState("");
    const [error, setError] = React.useState(false);
    const handleNameBlur = (event) => {
        const { value } = event.target;
        if (value) {
            setError(false)
        } else {
            setError(true)
            setNameHelperText(`${label} is mandatory`);
        }
    };
    const handleNameFocus = () => {
        setError(false);
        setNameHelperText("");
    };
    const handleChange = (event) => {
        setFullName(event.target.value);
    };
    useEffect(() => {
        onChange(fullName)
    }, [fullName]);
    return (
        <TextField
            label={label}
            variant="outlined"
            value={fullName}
            onChange={handleChange}
            InputProps={{
                style: { height: 50 }
            }}
            onBlur={handleNameBlur}
            onFocus={handleNameFocus}
            helperText={nameHelperText}
            error={error}
        />
    );
}
