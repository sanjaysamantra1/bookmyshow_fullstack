import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/apiClient.js';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getEvents({});
      setEvents(data);
    })();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <div className="grid">
        {events.map((e) => (
          <Link key={e._id} to={`/events/${e._id}`} className="card">
            <strong>{e.name}</strong>
            <div>{e.city}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
