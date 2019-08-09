const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const configDotEnv = require('dotenv').config;
const routes = require('./routes');

configDotEnv();

const app = express();

mongoose.connect(process.env.MONGODB_STR, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
