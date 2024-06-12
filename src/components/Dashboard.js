import axios from '../interceptors/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/login');
          return;
        }

        const { data: userData } = await axios.get('http://localhost:8000/api/home/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setUser(userData);
        setMessage(userData.message);
      } catch (e) {
        console.error('Not authenticated or other error', e);
        localStorage.clear();
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
      {user && (
        <div>
          <h4>User Details</h4>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};
