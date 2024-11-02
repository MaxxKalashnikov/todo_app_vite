import pool from "../helper/db.js"
import { Router } from "express"
import { emptyOrRows } from "../helper/utils.js"
import { auth } from "../helper/auth.js"

const todoRouter = Router()

todoRouter.get('/get', auth, (req, res, next) => {
    pool.query('select * from task;', (error, result) => {
        if(error){
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
})

todoRouter.post('/addnewtask', auth, (req, res, next) => {
    const content = req.body.description
    pool.query('insert into task (description) values ($1) returning *;', 
        [content], 
        (error, result) => {
            if(error){
                return next(error)
            }
            return res.status(200).json(result.rows[0])
        })
})

todoRouter.delete('/deletetask/:id', auth, (req, res, next) => {
    const taskId = parseInt(req.params.id)
    pool.query('delete from task where id=($1) returning *;', 
        [taskId], 
        (error, result) => {
            if(error){
                return next(error)
            }
            return res.status(200).json(result.rows[0])
        })
})

export default todoRouter


// different implementation of the same thing 

// todoRouter.delete('/deletetask/:id', async (req, res) => {
//     try {
//         const taskId = parseInt(req.params.id)
//         const response = await query('delete from task where id=($1) returning *;', [taskId])
//         const rows = response.rows ? response.rows : [] 
//         res.status(200).json(rows[0])
//     } catch (error) {
//         res.statusMessage = error
//         res.status(500).json({error: error})
//     }
// })

// todoRouter.get('/get', async (req, res) => {
//     try {
//         const response = await query('SELECT * FROM task;')
//         const rows = response.rows ? response.rows : [] 
//         res.status(200).json(rows)
//     } catch (error) {
//         res.statusMessage = error
//         res.status(500).json({error: error})
//     }
// })

// todoRouter.post('/addnewtask', async (req, res) => {
//     try {
//         const content = req.body.description
//         const response = await query('insert into task (description) values ($1) returning *;', [content])
//         const rows = response.rows ? response.rows : [] 
//         res.status(200).json(rows[0])
//     }catch (error) {
//         res.statusMessage = error
//         res.status(500).json({error: error})
//     }
// })