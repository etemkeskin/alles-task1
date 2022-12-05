const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, user');
    next();
})

const users = require('./routes/users');
const tickets = require('./routes/tickets');
const auth = require('./routes/auth');
// const admin = require('./routes/admin');

app.use('/users', users);
app.use('/tickets', tickets);
app.use('/auth', auth);
// app.use('/admin/', admin);

mongoose.connect('mongodb://localhost:27017/alles',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('You are connected to player-db!')
        app.listen(5000, function(){
            console.log("Server is listening on port 3000");
        });
    })
    .catch((error) => {
        console.log('Connection to player-db failed', error)
    });
// listen for requests
