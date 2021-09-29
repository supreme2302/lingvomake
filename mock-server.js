const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const uuid = require('uuid/v4');

const app = express();

app.use(bodyparser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookie());

const users = {
    'a@a.ru': {
        email: 'a@a.ru',
        password: '12345678'
    }
};
const ids = {};

app.post('/admin/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (
        !password || !email ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
    ) {
        return res.status(400).json({error: 'Not valid user data'});
    }
    if (users[email]) {
        return res.status(400).json({error: 'User already exists'});
    }

    const id = uuid();
    const user = {password, email};
    ids[id] = email;
    users[email] = user;

    res.cookie('mock-cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/admin/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!password || !email) {
        return res.status(400).json({error: 'email and password must not be empty'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(401).json({error: 'Wrong credentials'});
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('mock-cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.get('/admin/info', (req, res) => {
    const id = req.cookies['mock-cookie'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    users[email].score += 1;

    res.json(users[email]);
});

app.post('/admin/logout', (req, res) => {
    const id = req.cookies['mock-cookie'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }
    return res.status(200).clearCookie('mock-cookie', {
        path: '/'
    }).end();
});

const quizzes = [
    {
        id: 1,
        name: "quiz 1",
        questions: [
            {
                question: "how",
                answers: ['A', 'B'],
                correctAnswer: 'A'
            }
        ]
    }
]
//создать квиз
app.post('/quizzes', (req, res) => {
    const newQuiz = {
        id: uuid(),
        name: req.body.name,
        questions: []
    }
    quizzes.push(newQuiz);
    return res.status(201).send(req.body);
});

//получить список квизов
app.get('/quizzes', (req, res) => {
    return res.status(200).send(quizzes);
});

//Создать вопрос в квизе
app.post('/quizzes/:quizId/questions', (req, res) => {
    const quizId = req.params.quizId;
    quizzes.forEach(val => {
        if (val.id == quizId) {
            val.questions.push(req.body);
        }
    });
    return res.status(201).send(req.body);
});

//Получить один квиз
app.get('/quizzes/:quizId', (req, res) => {
    const quizId = req.params.quizId;
    for (let i = 0; i < quizzes.length; ++i) {
        if (quizzes[i].id == quizId) {
            return res.status(200).send(quizzes[i]);
        }
    }
    return res.status(404).json({error: 'Not found'})
});

const port = process.env.PORT || 8090;
app.listen(port);