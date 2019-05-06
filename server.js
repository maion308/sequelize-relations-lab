/**************************
 * SERVER-SIDE JAVASCRIPT *
 **************************/

// require express in app
const express = require('express');
// get parameters from POST requests
const bodyParser = require('body-parser');
// log to the terminal
const logger = require('morgan');
// import routes
const { authorRouter } = require('./routes/authorRouter')
const { bookRouter } = require('./routes/bookRouter')
// import models
const { Author, Book } = require('./model');

// generate a new express app
const app = express();

const PORT = process.env.PORT || 3000

/**************
 * MIDDLEWARE *
 **************/

app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/authors', authorRouter)
app.use('/books', bookRouter)

/**********
 * ROUTES *
 **********/

app.get('/', async (req, res) => {
  res.json({
    msg: 'Welcome to this Author Book app'
  })
})

/**********
 * SERVER *
 **********/

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
