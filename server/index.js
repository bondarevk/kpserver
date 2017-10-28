const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/kpserver', { useMongoClient: true });

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

app.use(cors());
app.options('*', cors());

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);