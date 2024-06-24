import express from 'express';
import { configDotenv } from "dotenv";
configDotenv()
import dbConnect from './src/config/db.js';
import projectRoutes from './src/routes/project.js';
import taskRoutes from './src/routes/task.js';

const app = express();

const startServer = async () => {
    try {
        await dbConnect()
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`)
        });
        app.use(express.json());
        app.use('/', projectRoutes);
        app.use('/', taskRoutes);
    } catch (error) {
        console.error(`Failed to start the server: ${error.message}`)
    }
}

startServer();