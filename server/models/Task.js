import pool from "../helper/db.js";

const selectAllTasks = async(email) => {
    return await pool.query('select * from task where user_email = $1;', [email])
}

const insertTask = async(task, email) => {
    return await pool.query('insert into task (description, user_email) values ($1, $2) returning *;', [task, email])
}

const deleteTaskById = async(id, email) => {
    return await pool.query('delete from task where id= $1 and user_email = $2 returning *;', [id, email])
}

const putTask = async(status, id) => {
    return await pool.query('update task set isDone = $1 where id = $2 returning *;', [status, id])
}

export { selectAllTasks, insertTask, deleteTaskById, putTask }