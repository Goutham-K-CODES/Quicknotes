import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('quicknotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (title && content) {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    }
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="heading">QuickNotes</h1>

      <div className="note-input">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-list">
        {filteredNotes.map(note => (
          <div key={note.id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
