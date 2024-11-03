import { selectAllTasks, insertTask, deleteTaskById } from "../models/Task.js";
import { emptyOrRows } from "../helper/utils.js";

async function getTasks(req, res, next){
    try {
        const result = await selectAllTasks()
        res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

async function postTask(req, res, next) {
    try {
        if(!req.body.description || req.body.description.length === 0){
            const error = new Error("Invalid description for a task")
            error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description)
        res.status(200).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}

async function deleteTask(req, res, next) {
    try {
        if(!req.params.id){
            const error = new Error('Task id is not provided')
            error.statusCode = 400
            return next(error)
        }
        const result = await deleteTaskById(req.params.id)
        res.status(200).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}

export { getTasks, postTask, deleteTask }