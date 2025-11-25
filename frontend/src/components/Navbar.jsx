import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img height='40' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpL3WJ0fkM-59JuBDE6N3ukgsjxzABsEDMCA&s" alt="" />
        </Link>
      </div>
      <div>
        <Link to="/movies">Movies</Link>
        <Link to="/events">Events</Link>
        {user && <Link to="/profile">My Profile</Link>}
        {user && user.isAdmin && <Link to="/admin">Admin</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
