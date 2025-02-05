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

// Get user progress
export async function getUserProgress(id) {
    const [rows] = await pool.query(`SELECT * FROM user_progress WHERE id_goal = ?`, [id])
    return rows
}

// Create a user progress
export async function createProgress(id_goal, progress, ai_response, progress_percentage) {
    const [rows] = await pool.query(`INSERT INTO user_progress (id_goal, progress, ai_response, progress_percentage) VALUES (?, ?, ?, ?)`, [id_goal, progress, ai_response, progress_percentage])
    return rows
}

// Delete user progress
export async function deleteProgress(id) {
    const [rows] = await pool.query('DELETE from user_progress WHERE id = ?', [id])
    return rows
}

// Update goal percentage
export async function updatePercentage(percentage, id_goal) {
    const [rows] = await pool.query('UPDATE goals SET percentage = ? WHERE id = ?', [percentage, id_goal])
    return rows
}