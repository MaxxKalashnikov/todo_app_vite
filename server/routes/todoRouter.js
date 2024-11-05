import pool from "../helper/db.js"
import { Router } from "express"
import { auth } from "../helper/auth.js"
import { getTasks, postTask, deleteTask, editTask } from "../controllers/TaskController.js"

const todoRouter = Router()

todoRouter.post('/get', auth, getTasks)

todoRouter.post('/addnewtask', auth, postTask)

todoRouter.delete('/deletetask/:id', auth, deleteTask)

todoRouter.put('/setdone', auth, editTask)

export default todoRouter