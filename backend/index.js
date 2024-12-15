import express from 'express'
import cors from 'cors'
import { getGoals, getGoal, createGoal } from './database.js'

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Get request to the homepage')
})

app.get('/goals', async (req, res) => {
    const goals = await getGoals()
    res.json({ result: goals })
})

// Get a goal 
app.get('/goal/:id', async (req, res) => {
    const id = req.params.id
    const goal = await getGoal(id)
    res.json({ result: goal })
})

app.listen(8000, () => {
    console.log("Listening to port 8000")
})