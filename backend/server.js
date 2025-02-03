import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// app.post('/gemini', async (req, res) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
//         const { id_goal, goalTitle, goalDescription, progressIdGoal, progressText, progressAiResponse, progressCreated, progress } = req.body

//         const prompt = `
//         The user has made a progress update: "${progress}".  
//         Their goal is titled "${goalTitle}" with the description: "${goalDescription}".  
//         The goal ID is: ${id_goal}.  
        
//         To provide better feedback, consider their previous progress : "${progressIdGoal}, ${progressText}, ${progressAiResponse}, ${progressCreated}" consider the date and time very carefully.  
//         Ensure that your feedback is relevant to the same goal (ID: ${id_goal}).  
        
//         ### Task:  
//         Analyze their progress so far and give **constructive feedback** on:  
//         1. What they have accomplished.  
//         2. What they need to do next to achieve their goal.
//         3. Tell them if they have accomplished their goal.  
        
//         ⚠️ Focus **only** on feedback—do not request additional information or ask questions.  
//         `;

//         const result = await model.generateContent(prompt)
//         res.json({ result: result })
//     } catch (error) {
//         console.log('Error:', error)
//         res.status(500).json({ error: 'An error occured while processing your request' })
//     }
// })

app.post('/gemini', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const { id_goal, goalTitle, goalDescription, progressHistory, progress } = req.body;

        // Format all progress history into a readable list
        const formattedHistory = progressHistory.map(entry => 
            `- [${entry.progressCreated}] ${entry.progressText} (AI Feedback: ${entry.progressAiResponse})`
        ).join("\n");

        const prompt = `
        The user has made a progress update: "${progress}".  
        Their goal is titled "${goalTitle}" with the description: "${goalDescription}".  
        The goal ID is: ${id_goal}.  
        
        To provide better feedback, consider their previous progress:  
        ${formattedHistory}  
        
        Ensure that your feedback is relevant to the same goal (ID: ${id_goal}).  

        ### Task:  
        Analyze their progress so far and give **constructive feedback** on:  
        1. What they have accomplished.  
        2. What they need to do next to achieve their goal.  
        3. Tell them if they have accomplished their goal.  
        
        ⚠️ Focus **only** on feedback—do not request additional information or ask questions.  
        `;

        const result = await model.generateContent(prompt);
        res.json({ result: result });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});


app.listen(port, () => console.log('Listening on port 3000'))


