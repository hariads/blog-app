const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const events = [];
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    axios.post('http://posts-clusterip-srv:4000/events', event);
    axios.post('http://comments-srv:4001/events', event);
    axios.post('http://query-srv:4002/events', event);
    axios.post('http://moderation-srv:4003/events', event);
    res.send({ ststus: 'OK' });
    console.log(events);
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen('4005', () => { console.log("listening on port 4005") });
