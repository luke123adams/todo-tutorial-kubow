const PORT = process.env.PORT ?? 8000
import express from "express"
const app = express()
import{ pool } from './db.js'
import cors from 'cors'
import { v4 } from "uuid"

// get all textDecorationSkip: 
app.use(cors())
app.use(express.json())
app.get('/todos/:userEmail', async (req, res) => {
      

      const { userEmail } = req.params
      console.log(userEmail)

      const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
      res.json(todos.rows)

    
})

// create new todo

app.post('/todos', async (req, res)=> {
      const { user_email, title, progress, date } = req.body
      const id = v4()
      console.log(user_email, title, progress, date)

      try {
           const newToDo = await pool.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)', [id, user_email, title, progress, date])
           res.json(newToDo)
      } catch {
            console.error(err)

      }
})

// edit todo

app.put('/todos/:id', async (req, res) => {
      const { id } = req.params
      const { user_email, title, progress, date } = req.body
      try {
        const editToDo = await pool.query('UPDATE todos SET user_email = $1, title=$2, progress = $3, date = $4 WHERE id = $5;',
         [user_email, title, progress, date, id])
        res.json(editToDo)
      } catch (err) {
            console.error(err)
      }
})

// delete todo

app.delete('/todos/:id', async (req, res) => {
      const { id } = req.params
      
      try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1', [id])
        res.json(deleteToDo)
      } catch (err) {
            console.error(err)
      }
})
app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))