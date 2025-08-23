import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon } from 'lucide-react'
import { Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {

    const handleDelete= async(e,id) =>{
        e.preventDefault();
        
          toast(
    (t) => (
      <div className="flex flex-col gap-4 items-center">
        <span>Are you sure you want to delete this note?</span>
        <div className="flex gap-8 w-full max-w-xs">
          <button
            className="flex-1 bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              // perform delete
              deleteNote(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="flex-1 bg-gray-300 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity, // keep it until user clicks
    }
  );}
    

    const deleteNote= async(id)=>{
         try {
                await api.delete(`/notes/${id}`);
                setNotes(prev => prev.filter(note=> note._id !==id))
                toast.success("Note deleted successfully!");
                // Optionally, you can refresh the notes list or remove the deleted note from the UI
            } catch (err) {
                console.error("Error deleting note:", err);
                toast.error("Failed to delete note. Please try again.");
            }
    }

  return (
    <Link to={`/notes/${note._id}`} className=" card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4" />
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e,note._id)}>
                        <Trash2Icon className="size-4" />
                    </button>
                </div>

            </div>
        </div>
     
    </Link>
  )
}

export default NoteCard

