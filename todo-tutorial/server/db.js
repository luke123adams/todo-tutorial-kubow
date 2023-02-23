import pkg from "pg";
const { Pool } = pkg
import {} from 'dotenv/config'

export const pool = new Pool({
    connectionString:
    process.env.POSTGRES_CONNECTION_URL,
})