import Note from '../models/Note.js';

export async function getAllNotes(_, res) {
    try{
        res.status(200).json(await Note.find().sort({createdAt: -1}));
    }catch(err){
        console.error('Error in getAllNotes', err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteById (req, res){
    try{
        const note= await Note.findById(req.params.id);
        note? res.status(200).json(note): res.status(404).json({message:"Note not found"});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
        console.error('Error in getNoteById', err);
    }
}

export async function createNote(req, res) {
    try{
        const {title,content}= req.body;
        const newNote= new Note({title:title, content:content})

        const savedNote= await newNote.save();

        res.status(201).json({message:"Note created successfully!", note: savedNote});

    }catch(err){
        console.log('Error in createNote', err)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export async function updateNote(req, res) {
    try{
        const {title, content} = req.body;
        const updatedNote =await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});

        updatedNote ? res.status(200).json({message:"Note updated successfully!", note: updatedNote}) : res.status(404).json({message:"Note not found"});

    }catch(err){
        console.error('Error in updateNote', err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

export async function deleteNote(req, res) {
    try{
        const {title,content}= req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        deletedNote ? res.status(200).json({message:"Note deleted successfully!", note: deletedNote}) : res.status(404).json({message:"Note not found"});
    }catch(err){
        console.error('Error in deleteNote', err);
        res.status(500).json({message:'Internal Server Error'})
    }
}