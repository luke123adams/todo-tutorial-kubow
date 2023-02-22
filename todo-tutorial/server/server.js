const PORT = process.env.PORT ?? 8000
import express from "express"
const app = express()
import{ pool } from './db.js'

// get all textDecorationSkip: 

app.get('/todos', (req, res) => {
    try {
     //   await

    } catch (err) {
        console.error(error)
    }
})

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))