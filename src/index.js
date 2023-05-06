var Db = require('./dboperations');
var Todo = require ('./Todo');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//later try with this two instead of bordyParser
app.use(express.json())
app.use(express.urlencoded({extended: true}))



router.use((request, response,next) => {
    // console.log('middleware');
    next();
})

router.route('').get((request, response) => {
    return response.json("Hello from todo list express server!")
})

router.route('/todo').get((request, response) => {
    Db.getAllTodoList().then(result => {
        response.json(result[0]);
    })
})

router.route('/todo/:id').get((request, response) => {
    Db.getTodoById(request.params.id).then(result => {
        // console.log(result);
        response.json(result[0]);
    })
})

router.route('/todo/add').post((request, response) => {
    // console.log("'/todo/add'", request);
    let todoModel = {...request.body}

    Db.addTodo(todoModel).then(result => {
        response.status(201).json(result);
    })
})

router.route('/todo/:id').put((request, response) => {
    console.log(request.query.description);
    Db.editTodoById(request.params.id, request.query.description).then(result => {
        // console.log(result);
        response.json(result);
    })
})

router.route('/todo/delete/:id').delete((request, response) => {
    Db.deleteTodoById(request.params.id).then(result => {
        // console.log(result);
        response.json(result);
    })
})


var port = process.env.PORT || 4200;
app.listen(port);
console.log('todoApi is running on port: ' + port);