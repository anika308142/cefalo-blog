const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const app = express();
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
let port = process.env.PORT;

dotenv.config();

app.listen(port, () => console.log('Express server is running at port : '));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
module.exports = app;
