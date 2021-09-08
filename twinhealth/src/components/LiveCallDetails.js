import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Counter from './Counter'

export default function LiveCallDetails({ hangupCall, fullName, phoneNumber, duration }) {
    return (
        <Grid>
            <RecordVoiceOverIcon style={{ fontSize: 200 }} />
            <Typography variant="h5" align="center" style={{ marginTop: "10px" }}>
                {`${fullName} ${phoneNumber}`}
            </Typography>
            <Counter duration={duration * 60} onSuccess={hangupCall} />
        </Grid>
    );
}
