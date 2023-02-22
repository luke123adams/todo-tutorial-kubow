import pkg from "pg";
const { Pool } = pkg
import {} from 'dotenv/config'

export const pool = new Pool({
    user: process.env.USERNAME,
    password:  process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todo-tutorial'
})