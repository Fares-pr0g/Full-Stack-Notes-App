import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import router from './routes/notesRoutes.js';
import path from "path";

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5001;
const __dirname= path.resolve();


// middleware
if (process.env.NODE_ENV !== "production") {    
    app.use(cors({
        origin:"http://localhost:5173"
    }));
};

app.use(express.json());
app.use(rateLimiter);


app.use('/api/fares/notes', router)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
    })
};

connectDB().then(() => {
    app.listen(PORT, (req,res) => {
        console.log(`Server is running on port ${PORT}`);
    })
})

