const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 8000;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// errors
app.use((req, res, next) =>{
  res.handle = (err, data) => res.status(err ? 400: 200).send(err || data);
  next();
});

//routes
app.use('/todo', todoRoutes);

//server
app.listen(PORT, (err) =>{
  console.log(err || `Express Listening on port ${PORT}`)
});
