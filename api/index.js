const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const config = reuire('config');

app.use(bodyParser.json())

app.unsubscribe(bodyParser.json())
app.listen(config.get('api.porta'), ()=> console.log('API is on'));