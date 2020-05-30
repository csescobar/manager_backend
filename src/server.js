const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const server = express();

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);


