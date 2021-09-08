import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

export default function Counter({ onSuccess, duration }) {
    const [counter, setCounter] = React.useState(duration);

    useEffect(() => {
        if (counter === 0) {
            onSuccess();
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    const handeClick = () => {
        onSuccess();
        //will use to end the call.
    }
    return (
        <Button
            style={{ textTransform: 'none' }}
            variant="contained" color="secondary"
            onClick={handeClick}
        >
            {`Call will End in ${parseInt(counter / 60)} Min ${counter % 60} Sec`}
        </Button>
    );
}