import React from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import  toast  from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}


export default App
