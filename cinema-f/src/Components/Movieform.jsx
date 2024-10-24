import React, { useState } from 'react';
import "./movieform.css";

function Movieform() {
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    language: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/film/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      });

      if (!response.ok) {
        throw new Error('Failed to create movie');
      }

      const result = await response.json();
      console.log('Movie created:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Movie Information</h2>
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Movie Name</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={movieData.title} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={movieData.description} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select 
            id="genre" 
            name="genre" 
            value={movieData.genre} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Genre</option>
            <option value="romantic">Romantic</option>
            <option value="modhik">Modhik</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input 
            type="text" 
            id="duration" 
            name="duration" 
            value={movieData.duration} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <input 
            type="text" 
            id="language" 
            name="language" 
            value={movieData.language} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Movieform;
