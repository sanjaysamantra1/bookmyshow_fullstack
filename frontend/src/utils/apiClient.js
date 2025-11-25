import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const register = async (payload) => {
  const { data } = await client.post('/users/register', payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await client.post('/users/login', payload);
  return data;
};

export const getProfile = async (token) => {
  const { data } = await client.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const getMovies = async (params) => {
  const { data } = await client.get('/movies', { params });
  return data;
};

export const getMovieDetails = async (id) => {
  const { data } = await client.get(`/movies/${id}`);
  return data;
};

export const getMovieShowtimes = async (id) => {
  const { data } = await client.get(`/movies/${id}/showtimes`);
  return data;
};

export const getEvents = async (params) => {
  const { data } = await client.get('/events', { params });
  return data;
};

export const getEventDetails = async (id) => {
  const { data } = await client.get(`/events/${id}`);
  return data;
};

export const getUserBookings = async (token) => {
  const { data } = await client.get('/users/bookings', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const searchAll = async (q) => {
  const { data } = await client.get('/search', { params: { q } });
  return data;
};

export default client;
