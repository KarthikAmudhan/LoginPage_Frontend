// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import './Home.css'

const Home = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // optional: verify token & fetch fresh user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get('/api/users/me');
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Could not fetch user', err);
      }
    };
    if (!user) fetchMe();
  }, []);

  return (
    <>
      <style>{`
        .home-container {
          display:flex; flex-direction:column; justify-content:center; align-items:center;
          height:100vh; text-align:center; 
          background:linear-gradient(135deg,#2575fc,#6a11cb);
          color:white; font-family:Arial,sans-serif; padding:20px;
        }
        .home-container h2 { font-size:2.5rem; margin-bottom:1rem; }
        .home-container p { font-size:1.2rem; }
      `}</style>

      <div className="home-container">
        <h2>Welcome, {user?.firstName || 'User'}</h2>
        <p>Home page — protected route.</p>
      </div>
    </>
  );
};

export default Home;
