import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Get all goals
export async function getGoals() {
    const [rows] = await pool.query('SELECT * FROM goals ORDER BY id DESC')
    return rows
}

// Get single goal
export async function getGoal(id) {
    const [rows] = await pool.query(`SELECT * FROM goals WHERE id = ? `, [id])
    return rows
}

// Create a goal
export async function createGoal(title, description, target_value) {
    const [rows] = await pool.query(`INSERT INTO goals (title, description, target_value) VALUES (?, ?, ?)`,
        [title, description, target_value]
    )
    return rows
}

// Edit a goal
export async function editGoal(id, title, description) {
    const [rows] = await pool.query('UPDATE goals SET title = ?, description = ? WHERE id = ?', [title, description, id])
    return rows
}

// Delete a goal
export async function deleteGoal(id) {
    const [rows] = await pool.query('DELETE from goals WHERE id = ?', [id])
    return rows
}

// const goals = await getGoals()
// console.log(goals)

// const goals = await createGoal('Belajar koding selama 30 hari', 'Saya akan belajar koding selama 30 hari', 0)
// console.log(goals)

// const goal = await getGoal(1)
// console.log(goal)