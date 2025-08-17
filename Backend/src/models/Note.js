import mongoose from "mongoose";

// create a schema (blue print)
// create a model (using a name and a schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
},
{timestamps: true}// createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);
export default Note;