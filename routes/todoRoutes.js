const express = require('express');
const todoRoutes = express.Router();
const bodyParser = require('body-parser');
const todos = require('../models/todo');
const util = require('util');

todoRoutes.get('/', (req, res) => {
  todos.get(res.handle, req.query);

});

todoRoutes.post('/', (req, res) => {
  todos.post(req.body, res.handle);
});

todoRoutes.put('/:id', bodyParser.json(), (req, res) => {
  res.type('text')
  res.write('request put the following :\n')
  res.write(util.inspect(req.body) + '\n')

  res.write('and the archive property is a ' + typeof req.body.complete + '\n')
  todos.put(req.body, req.params.id, res.handle);
});

// curl -XPUT -H'Content-Type: application/json'
// -d'{"complete":false}'
//  localhost:8000/todo/7b49214e-4fb8-41b5-8e1b-ad02d0ddc4f4

todoRoutes.delete('/:id', (req, res) => {
  todos.delete(req.params.id, res.handle);
});

module.exports = todoRoutes;
