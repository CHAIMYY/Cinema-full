import { useState, useEffect } from 'react';
import filmService from '../Services/filmService';

const useFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    filmService.getFilms()
      .then(response => {
        setFilms(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { films, loading, error };
};

export default useFilms;
