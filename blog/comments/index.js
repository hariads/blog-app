const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostID[req.params.id]);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('Hex');
    const { content } = req.body;
    const comments = commentsByPostID[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostID[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: req.params.id, status: 'pending' }
    });

    res.status(201).send(commentsByPostID[req.params.id]);
});

app.post('/events', async (req, res) => {
    console.log('Evenet Received: ', req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        const comments = commentsByPostID[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id, postId, status, content
            }
        });

    }
    res.send({});
});

app.listen(4001, () => {
    console.log("listenng on 4001");
});