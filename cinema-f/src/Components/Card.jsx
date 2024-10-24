import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FilmsList = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/film', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });

                                  console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                  const data = await response.json(); 
                  setFilms(data);
            } catch (error) {
                console.error('Error fetching films:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return <p>Loading films...</p>;
    }

    return (
        <div className="cards">
            {films.map((film) => (
                <div className="container">
                    <div className="wrapper">
                        <div className="banner-image"> </div>
                        <h1>{film.title}</h1>
                        <p>{film.description}</p>
                    </div>
                    <div className="button-wrapper">
                        <Link className="btn outline" to="/details">DETAILS</Link>
                        <button className="btn fill">RESERVE NOW</button>
                    </div>
                </div>
            ))}
        </div>)
}

export default FilmsList;
