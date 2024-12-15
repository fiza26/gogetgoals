import express from 'express'
import cors from 'cors'
import { getGoals, getGoal, createGoal } from './database.js'

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Get request to the homepage')
})

// Get all goals
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

// Create new goal
app.post('/creategoal', async (req, res) => {
    try {
        const { title, description } = req.body
        const newGoal = await createGoal(title, description, 0)
        res.json({ result: newGoal })
    } catch (error) {
        console.log('Error creating goal', error)
        res.status(500).json({ error: 'An error occured while creating a goal' })
    }
})

app.listen(8000, () => {
    console.log("Listening to port 8000")
})