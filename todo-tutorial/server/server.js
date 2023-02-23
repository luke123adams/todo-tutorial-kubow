const PORT = process.env.PORT ?? 8000
import express from "express"
const app = express()
import{ pool } from './db.js'
import cors from 'cors'

// get all textDecorationSkip: 
app.use(cors())

app.get('/todos/:userEmail', async (req, res) => {
      

      const { userEmail } = req.params
      console.log(userEmail)

      const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
      res.json(todos.rows)

    
})

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))