const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const questions = []

app.post('/questions', (req, res) => {
    questions.push(req.body);
    return res.status(201).send(req.body);
});

app.get('/questions', (req, res) => {
    return res.status(200).send(questions);
});

const port = process.env.PORT || 8080;
app.listen(port);