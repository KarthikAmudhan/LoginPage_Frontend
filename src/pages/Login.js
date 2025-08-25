import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/login', { identifier, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  // CSS-in-JS
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    },
    form: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '30px 25px',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '400px'
    },
    input: {
      padding: '12px 15px',
      margin: '10px 0',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem'
    },
    button: {
      padding: '12px',
      marginTop: '15px',
      border: 'none',
      borderRadius: '8px',
      background: '#ff7eb3',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    buttonHover: {
      background: '#ff758c'
    },
    error: {
      color: '#ff4d4f',
      marginTop: '10px',
      fontWeight: 'bold'
    },
    title: {
      marginBottom: '20px'
    }
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submit}>
        <h2 style={styles.title}>Login</h2>
        <input
          style={styles.input}
          placeholder="Email or Mobile"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>
        {err && <p style={styles.error}>{err}</p>}
      </form>
    </div>
  );
};

export default Login;
