const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const server = express();

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-vlxex.mongodb.net/chmanager?retryWrites=true&w=majority', {
    useNewUrlParser: true
})


server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3000);


