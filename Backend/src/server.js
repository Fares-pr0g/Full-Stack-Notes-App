import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import router from './routes/notesRoutes.js';

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5001;


// middleware

app.use(cors());
app.use(express.json());
app.use(rateLimiter);


app.use('/api/fares/notes', router)

connectDB().then(() => {
    app.listen(PORT, (req,res) => {
        console.log(`Server is running on port ${PORT}`);
    })
})

