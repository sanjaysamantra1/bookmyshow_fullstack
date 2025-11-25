import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieShowtimes } from '../utils/apiClient.js';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    (async () => {
      const [m, s] = await Promise.all([getMovieDetails(id), getMovieShowtimes(id)]);
      setMovie(m);
      setShows(s);
    })();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <div className="card">
        <h2>{movie.title}</h2>
        <div>{movie.description}</div>
        <div>{(movie.genre || []).join(', ')} • {(movie.language || []).join(', ')}</div>
      </div>
      <div className="card">
        <h3>Showtimes</h3>
        {shows.map((show) => (
          <div key={show._id}>
            {new Date(show.startTime).toLocaleString()} - {show.venue} ({show.city})
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
