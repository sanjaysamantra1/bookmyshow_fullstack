import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAll } from '../utils/apiClient.js';

const HomePage = () => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);

  const onSearch = async (e) => {
    e.preventDefault();
    const data = await searchAll(q);
    setResults(data);
  };

  useEffect(() => {
    (async () => {
      const data = await searchAll('');
      setResults(data);
    })();
  }, []);

  return (
    <div>
      <form onSubmit={onSearch} className="card">
        <div className="form-group">
          <label>Search movies, events, venues</label>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
        </div>
        <button className="btn btn-primary">Search</button>
      </form>

      {results && (
        <>
          <div className="card">
            <h3>Movies</h3>
            <div className="grid">
              {results.movies.map((m) => (
                <Link key={m._id} to={`/movies/${m._id}`} className="card">
                  <strong>{m.title}</strong>
                  <div>{(m.genre || []).join(', ')}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Events</h3>
            <div className="grid">
              {results.events.map((e) => (
                <Link key={e._id} to={`/events/${e._id}`} className="card">
                  <strong>{e.name}</strong>
                  <div>{e.city}</div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
