import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../utils/apiClient.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getMovies({});
      setMovies(data);
    })();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <div className="grid">
        {movies.map((m) => (
          <Link key={m._id} to={`/movies/${m._id}`} className="card">
            <strong>{m.title}</strong>
            <div>{(m.genre || []).join(', ')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
