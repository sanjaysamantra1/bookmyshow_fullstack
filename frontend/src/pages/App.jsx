import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import MoviesPage from './MoviesPage.jsx';
import MovieDetailsPage from './MovieDetailsPage.jsx';
import EventsPage from './EventsPage.jsx';
import EventDetailsPage from './EventDetailsPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Carousel from './Carousel.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
