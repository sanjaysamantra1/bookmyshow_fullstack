import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventDetails } from '../utils/apiClient.js';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    (async () => {
      const e = await getEventDetails(id);
      setEvent(e);
    })();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{event.name}</h2>
      <div>{event.description}</div>
      <div>
        {event.city} • {new Date(event.date).toLocaleString()} • {event.venue}
      </div>
    </div>
  );
};

export default EventDetailsPage;
