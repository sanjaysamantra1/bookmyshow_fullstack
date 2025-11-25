import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/apiClient.js';
import { useAuth } from '../state/AuthContext.jsx';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: loginCtx } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register({ name, city, email, password });
      loginCtx(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
