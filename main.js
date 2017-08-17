const express = require('express');
const server = express();
const mustache = require('mustache-express');
const bodyparser = require('body-parser');

server.use(bodyparser.urlencoded({extended:false}));

server.engine('mustache', mustache());
server.set("views", "./templates");
server.set('view engine', 'mustache');

const todoList = [];

server.get('/', function (req, res) {
    res.render("index", {
        todoItems: todoList
    });
});

let counter = 0;

server.post('/', function (req, res) {
    counter += 1
    todoList.push({
        item: req.body.item, 
        complete: false, 
        id: counter
    });
    res.render('index', {
        todoItems: todoList
    });
});

server.post('/:id', function (req, res) {
    console.log(req.params.id);

    for (let i = 0; i < todoList.length ; i++) {
        if(parseFloat(todoList[i].id) === parseFloat(req.params.id)) {
        console.log(req.params.id);

            todoList[i].complete = true;
        }
    }
    res.render('index', {todoItems: todoList});
});


server.listen(3000, function () {
    console.log("success!");
});

