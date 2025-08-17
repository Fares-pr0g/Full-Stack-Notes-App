import express from 'express';
import router from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5001;

connectDB();

// middleware
app.use(express.json());


app.use('/api/fares/notes', router)

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})

