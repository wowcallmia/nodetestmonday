const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const util = require('util');

const file = path.join(__dirname, '../data/todo.json');

exports.get = function(cb, params) {
// if (params.complete === false) {
//
// }

  fs.readFile(file, (err, buffer) => {
    if (err) return cb(err);

    let data;
    try {
      data = JSON.parse(buffer);
    } catch (err) {
      data = [];
    }
    //  if (params.complete === false){
    //   data =data.filter((cur) => cur.complete.false);
    //   cb(null, data);
    // }


  //   // else {
    cb(null, data);
    console.log('data', data);
    console.log('params', params);
  // // }
   });
 };

exports.write = function(cb, newData) {
  let json = JSON.stringify(newData);
  fs.writeFile(file, json, cb);
};

exports.post = function (newTodo, cb) {
  exports.get((err, todos) => {
    if(err) return cb(err);

    newTodo.id = uuid();
    newTodo.complete = false;
    todos.push(newTodo);
    exports.write(cb, todos);
  });
};

exports.put = function(newTodo, id, cb) {
  console.log('todo', newTodo);
  console.log('id: ', id);
  console.log('cb: ', cb);
  exports.get((err, todos) => {
    if(err) return cb(err);
    const editTodos = todos.filter((todo) => todo.id !== id);

    // if(todo.complete === false);


    if(editTodos.length < todos.length) {
      const editTodo = Object.assign({}, newTodo);
      editTodo.id = id;
      editTodos.push(editTodo);
      exports.write(cb, editTodos);
    } else{
      return cb('NO ID MATCH EDIT');
    }
  });
};

exports.delete = function(id, cb) {
  exports.get((err, todos) => {
    if (err) return cb(err);
    const editTodos = todos.filter((todo) => todo.id !== id);

    if(editTodos.length < todos.length) {
      exports.write(cb, editTodos);
    } else {
      return cb('NO ID MATCH DEL')
    }
  });
};
