import { Router } from "express"
import { auth } from "../helper/auth.js"
import { getTasks, postTask, deleteTask } from "../controllers/TaskController.js"

const todoRouter = Router()

todoRouter.get('/get', auth, getTasks)

todoRouter.post('/addnewtask', auth, postTask)

todoRouter.delete('/deletetask/:id', auth, deleteTask)

export default todoRouter