var config = require('./dbconfig');
const sql = require('mssql');

const getAllTodoList = async () => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request().query('SELECT * FROM To_do_List');
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}

const getTodoById = async (id) => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .query('SELECT * FROM To_do_List WHERE id = ' + id);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}

const deleteTodoById = async (id) => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .query('DELETE FROM To_do_List WHERE id = ' + id);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}

const editTodoById = async (id, desc) => {
    try {
        let pool = await sql.connect(config);
        console.log ("id", id)
        console.log ("desc: ", desc);
        // const query = 'UPDATE To_do_List SET Description = ' +desc+ ' WHERE id = '+id;
        const query = `UPDATE To_do_List SET Description = '${desc}' WHERE id = ${id}`
        console.log(query)
        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .query(query);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function addTodo(todoModel) {
    try {
        let pool = await sql.connect(config);
        let insertTodo = await pool.request()
            // .input('Id', sql.Int, todoModel.Id)
            .input('Description', sql.NVarChar, todoModel.Description)
            .execute('InsertTodo');
        return insertTodo.recordsets;
    } catch (ex) {
        console.log(ex);
    }
}

module.exports = {
    getAllTodoList: getAllTodoList,
    getTodoById: getTodoById,
    addTodo: addTodo,
    deleteTodoById: deleteTodoById,
    editTodoById: editTodoById
}