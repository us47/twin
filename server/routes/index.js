var express = require('express');
var router = express.Router();
var settings = require('../settings');

const AUTH_ID = settings.AUTH_ID;
const AUTH_TOKEN = settings.AUTH_TOKEN;

/* Create a voice Call. */
router.post('/api/makecall', function (req, res) {
  var plivo = require('plivo');
  var client = new plivo.Client(AUTH_ID, AUTH_TOKEN);
  const {
    from,
    to,
    duration
  } = req.body
  try {
    client.calls.create(
      from,
      to,
      "http://s3.amazonaws.com/static.plivo.com/answer.xml",
      {
        answerMethod: "GET",
        timeLimit: duration,
        ringTimeout: 60
      },
    ).then(function (response) {
      res.send(response)
    }, function (err) {
      res.send(err)
    });
  } catch (error) {
    res.send(error);
  }
});

/* save call details*/
router.post('/api/savecalldetails', async function (req, res) {
  const CallHistory = require("../src/models/CallHistory");
  const handleError = (err) => {
    res.send(err)
  }
  const {
    name,
    from,
    to,
    duration,
    call
  } = req.body
  const callHistory = await CallHistory.create({
    time: new Date(),
    name,
    from,
    to,
    duration,
    call
  }).catch(handleError)
  res.send('Done');
});

/* get call details*/
router.get('/api/allcallhistory', async function (req, res) {
  const {
    name
  } = req.query
  const CallHistory = require("../src/models/CallHistory");
  const handleError = (err) => {
    res.send('some thing went wrong')
  }
  const allCalls = await CallHistory.findAll({ where: { name }, order: [['createdAt', 'DESC']], limit: 5 }).catch(handleError);
  res.send(allCalls);
});

module.exports = router;
