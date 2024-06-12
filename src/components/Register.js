// src/components/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../interceptors/axios';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      email: email,
    };

    try {
        await axios.post(
          'http://localhost:8000/api/register/',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        navigate('/login');
      } catch (error) {
        setError('Registration failed. Please try again.');
        console.error('Registration failed', error);
      }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Email"
              name="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
