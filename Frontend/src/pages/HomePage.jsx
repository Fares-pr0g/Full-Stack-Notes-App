import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import api from '../lib/axios'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes]= useState([]);
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    const fetchNotes = async()=>{
      try{
        const res= await api.get('/notes');
        setNotes(res.data)
        console.log(res.data)
        setIsRateLimited(false);
      }catch(err){
        if(err.response && err.response?.status === 429){
          setIsRateLimited(true);
        }
        console.error("Error fetching notes:", err);
      }finally{
        setLoading(false);
      }
    };

    fetchNotes();

  },[])

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar/>
      
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading &&<div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length==0 && !isRateLimited && <NotesNotFound />}

        {notes.length>0 && !isRateLimited &&(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
