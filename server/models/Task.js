import pool from "../helper/db.js";

const selectAllTasks = async() => {
    return await pool.query('select * from task;')
}

const insertTask = async(task) => {
    return await pool.query('insert into task (description) values ($1) returning *;', [task])
}

const deleteTaskById = async(id) => {
    return await pool.query('delete from task where id=($1) returning *;', [id])
}

export { selectAllTasks, insertTask, deleteTaskById }