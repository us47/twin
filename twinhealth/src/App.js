import React, { useEffect } from "react";
import axios from 'axios';
import { makeStyles, Button, Grid, Typography, Box, CircularProgress, Paper } from '@material-ui/core';
import Duration from './components/Duration';
import PhoneNumber from './components/PhoneNumber';
import FullName from './components/FullName';
import LiveCallDetails from './components/LiveCallDetails'
import CallHistory from './components/CallHistory'
import subHeader from './common';
import { BASE_API_URL } from './common';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
      width: '35ch',
    }
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: theme.spacing(55),
    width: theme.spacing(40)
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
}));

function App() {
  const classes = useStyles();

  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [toPhoneNumber, setToPhoneNumber] = React.useState('');
  const [duration, setDuration] = React.useState(5);
  const [callStatus, setCallStatus] = React.useState('collection');
  const [callId, setCallId] = React.useState('');
  const [callHistoryData, setCallHistoryData] = React.useState([]);

  useEffect(() => {
    const data = {
      name: fullName,
      from: phoneNumber,
      to: toPhoneNumber,
      duration: duration * 60,
      call: callId
    }
    if (callStatus === 'connecting') {
      const voiceCall = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('connected')
        }, 5000);
      });
      voiceCall.then((res, rej) => {
        setCallStatus(res);
      })
    } else if (callStatus === 'connected') {
      axios({
        url: `${BASE_API_URL}/api/makecall`,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data
      }).then((res) => {
        setCallId(res?.data?.requestUuid);
      })
    } else if (callStatus === 'completed') {
      axios({
        url: `${BASE_API_URL}/api/savecalldetails`,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data
      }).then((res) => {
        axios({
          url: `${BASE_API_URL}/api/allcallhistory?name=${fullName}`,
          method: 'GET',
          headers: { 'content-type': 'application/json' }
        }).then((res) => {
          setCallHistoryData(res?.data)
        })
      })
    }
  }, [callStatus])

  const handleCall = () => {
    setCallStatus('connecting');
  }

  const hangupCall = () => {
    setCallStatus('completed');
  }

  return (
    <Grid container spacing={1} className={classes.root} >
      <Grid item sm={4} />
      <Grid item container sm={4} >
        <Paper elevation={4} className={classes.paper}>
          {
            <Grid item container className={classes.container}>
              <Grid item >
                <Typography variant="h2" align="center">
                  Twin Demo
                </Typography>
                <Typography variant="h5" align="center" style={{ marginTop: "10px" }}>
                  {subHeader(phoneNumber)[callStatus]}
                </Typography>
              </Grid>
              <Grid />
              {callStatus == 'completed' && <CallHistory data={callHistoryData} />}
              {
                callStatus == 'connected' && <LiveCallDetails
                  hangupCall={hangupCall}
                  fullName={fullName}
                  phoneNumber={phoneNumber}
                  duration={duration}
                />
              }
              {
                ['collection', 'connecting'].includes(callStatus) &&
                <Grid item container className={classes.container}>
                  <Grid item >
                    <FullName
                      label="Full Name"
                      onChange={setFullName}
                    />
                  </Grid>
                  <Grid item>
                    <PhoneNumber
                      label="Phone Number"
                      onChange={setPhoneNumber}
                    />
                  </Grid>
                  <Grid item>
                    <PhoneNumber
                      label="Phone Number to connect"
                      onChange={setToPhoneNumber}
                    />
                  </Grid>
                  <Grid item>
                    <Duration sendDuration={setDuration} />
                  </Grid>
                  <Grid item container className={classes.container}>
                    {
                      callStatus == 'connecting' ? <Box ><CircularProgress color="secondary" /></Box> : <Button variant="contained" color="secondary" onClick={handleCall}>Call</Button>
                    }

                  </Grid>
                </Grid>
              }
            </Grid>
          }
        </Paper>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
}

export default App;
