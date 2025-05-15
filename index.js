require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
//const { query } = require('./helpers/db.js')
const { todoRouter } = require('./routes/todo.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', todoRouter)

//const port = 3001
const port = process.env.PORT

/*app.get("/", (req, res) => {
  const pool = openDb()

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message })
        } 
        res.status(200).json(result.rows)
        
    })
})*/

/*const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'mi2360366',
        port: 5432,
    })
    return pool
}*/
const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,  
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: process.env.SSL
       
    })
    return pool
}
/*
app.get("/", async(req, res) => {
    console.log(query)
    try {
        const result = await query('SELECT * FROM task')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        res.statusMessage = error
        res.status(500).json({ error: error })
    }
})


app.post("/new", async(req, res) => {
    try{
        const result = await query('Insetr into task (description) values ($1) returning *', 
            [req.body.description])
        res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({ error: error})
    }
})

app.delete("/delete/:id", async(req, res) => {
    const id = Number(req.params.id)
    try{
        const result = await query('DELETE FROM task WHERE id = $1', 
            [id])
        res.status(200).json({id: id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({ error: error})
    }
    
})*/

app.get('/', (req, res) => {
    res.send('Server is running...');
});



app.listen(port)