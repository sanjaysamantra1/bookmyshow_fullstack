import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { getUserBookings } from '../utils/apiClient.js';

const ProfilePage = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getUserBookings(token);
      setBookings(data);
    })();
  }, [token]);

  return (
    <div>
      <div className="card">
        <h2>Profile</h2>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>City: {user.city}</div>
      </div>
      <div className="card">
        <h3>Bookings</h3>
        {bookings.map((b) => (
          <div key={b._id}>
            {b.type.toUpperCase()} • Seats: {b.seats.join(', ')} • Amount: ₹{b.amount} • Status: {b.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
