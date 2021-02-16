const topics = require('./data/topics.json');
const paragraphs = require('./data/paragraphs.json');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3010;
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.get('/paragraphs', (req, res) => {
    res.json(paragraphs);
});

app.get('/topics', (req, res) => {
    res.json(topics);
});

app.listen(port, () => {
    console.log(`Ms backend mock listening at http://localhost:${port}`);
});