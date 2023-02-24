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

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))