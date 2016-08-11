'use strict'
const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const session         = require('express-session');
const methodOverride  = require('method-override');
const homeRoute       = require('./routes/home'); //home route
const userRoute       = require('./routes/user_routes'); //route to user folder



const app             = express();
const port            = process.env.PORT || 3000;

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: {maxAge: 36000000}
}));

app.set('view engine', 'ejs') //setting view engine
app.set(logger('dev')) // setting morgan middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname,'/bower_components')));


app.use('/', homeRoute);
app.use('/user', userRoute);


app.use(methodOverride('_method'));

// app.use('/',(req, res)=>{
//   res.send('Welcome You\'re now connected')
// });


app.listen(port, (req, res)=>{
  console.log("Server is listening on port", port);
});
