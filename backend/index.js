import express from 'express'
import cors from 'cors'
import { getGoals, getGoal, createGoal, editGoal, deleteGoal, getUserProgress, createProgress, deleteProgress, updatePercentage, login, signup } from './database.js'


const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Get request to the homepage')
})

// Get all goals
app.get('/goals', async (req, res) => {
    const { userId } = req.query
    const goals = await getGoals(userId)
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
        const { userId, title, description } = req.body
        const newGoal = await createGoal(userId, title, description, 0)
        res.json({ result: newGoal })
    } catch (error) {
        console.log('Error creating goal', error)
        res.status(500).json({ error: 'An error occured while creating a goal' })
    }
})

// Update goal
app.post('/editgoal', async (req, res) => {
    try {
        const { id, title, description } = req.body
        await editGoal(id, title, description)
        res.status(200).json({ message: 'Goal updated succesfully' })
    } catch (error) {
        console.log('Error updating goal', error)
        res.status(500).json({ error: 'An error occured' })
    }
})

// Delete goal
app.post('/deletegoal', async (req, res) => {
    try {
        const { id } = req.body
        await deleteGoal(id)
        res.status(200).json({ message: 'Goal deleted successfully' })
    } catch (error) {
        console.log('Error deleting goal', error)
        res.status(500).json({ error: 'An error occured while deleting a goal' })
    }
})

// Get user progress
app.get('/getuserprogress/:id', async (req, res) => {
    try {
        const id = req.params.id
        const progress = await getUserProgress(id)
        res.json({ result: progress })
    } catch (error) {
        console.log(error)
    }
})

// Create user progress
app.post('/createprogress', async (req, res) => {
    try {
        const { id_goal, progress, ai_response, progress_percentage } = req.body
        const userProgress = await createProgress(id_goal, progress, ai_response, progress_percentage)
        res.json({ result: userProgress })
    } catch (error) {
        console.log('Error creating user progress', error)
        res.status(500).json({ error: 'An error occured while creating user progress' })
    }
})

// Delete user progress
app.post('/deleteprogress', async (req, res) => {
    try {
        const { id } = req.body
        await deleteProgress(id)
        res.status(200).json({ message: 'User progress deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'An error occured while deleting user progress' })
    }
})

// Update percentage
app.post('/updatepercentage', async (req, res) => {
    try {
        const { id_goal, percentage } = req.body
        await updatePercentage(percentage, id_goal)
        res.status(200).json({ message: 'Goal percentage has been updated successfully' })
    } catch (error) {
        res.status(500).json({ error: 'An error occured while updating goal percentage' })
    }
})

// Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await login(username, password);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.status(200).json({ success: true, message: 'Login success', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while logging in' });
    }
});

// User signup
app.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body

        if (!name || !username || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const user = await signup(name, username, password)

        if (!user) {
            return res.status(400).json({ success: false, message: 'Signup failed. Username may already exist' })
        }

        res.status(200).json({ success: true, message: 'Signup success' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occured while signing up' })
    }
})





app.listen(8000, () => {
    console.log("Listening to port 8000")
})