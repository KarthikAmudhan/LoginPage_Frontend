import React, { useEffect, useState } from 'react';
import API from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.get('/api/users');
        setUsers(res.data);
      } catch (error) {
        setErr(error.response?.data?.message || 'Failed to load users');
      }
    };
    getUsers();
  }, []);

  // CSS-in-JS styles
  const styles = {
    container: {
      padding: '40px 20px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0899c1ff, #0072ff)',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '25px'
    },
    error: {
      color: '#ff4d4f',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      maxWidth: '700px',
      margin: '0 auto'
    },
    item: {
      background: 'rgba(255, 255, 255, 0.1)',
      margin: '10px 0',
      padding: '12px 20px',
      borderRadius: '10px',
      transition: 'transform 0.2s ease, background 0.2s ease',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    name: {
      fontWeight: 'bold',
      color: '#a6ff00ff'
    },
    email: {
      fontStyle: 'italic',
      color: '#ffffff'
    },
    mobile: {
      color: '#72ff3bff'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users (except you)</h2>
      {err && <p style={styles.error}>{err}</p>}
      <ul style={styles.list}>
        {users.map(u => (
          <li key={u._id} style={styles.item}>
            <span style={styles.name}>{u.firstName} {u.lastName}</span>
            <span style={styles.email}>{u.email}</span>
            <span style={styles.mobile}>{u.mobileNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
