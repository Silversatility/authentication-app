import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerAuthChange } from '../utils/auth'; 

import axios from '../interceptors/axios';


export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          navigate('/login');
          return;
        }

        await axios.post(
          'http://localhost:8000/api/logout/',
          { refresh_token: refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axios.defaults.headers.common['Authorization'] = null;
        triggerAuthChange();
        navigate('/login');
      } catch (e) {
        console.log('Logout not working', e);
        localStorage.clear();
        triggerAuthChange();
        navigate('/login');
      }
    })();
  }, [navigate]);

  return <div>Logging out...</div>;
};
