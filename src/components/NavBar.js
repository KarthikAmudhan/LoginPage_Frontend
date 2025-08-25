// frontend/src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        .navbar {
          display:flex; justify-content:space-between; align-items:center;
          padding:12px 20px; background:linear-gradient(135deg,#2575fc,#6a11cb);
          color:white; box-shadow:0 4px 10px rgba(0,0,0,0.2);
        }
        .nav-link {
          margin:0 10px; text-decoration:none; color:white; font-weight:500;
          transition:color 0.3s;
        }
        .nav-link:hover { color:#ffeb3b; }
        .logout-btn {
          padding:8px 16px; border:none; border-radius:6px;
          background:#3498db; color:white; cursor:pointer;
          transition:background 0.3s;
        }
        .logout-btn:hover { background:#2980b9; }
      `}</style>

      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          {token && <Link to="/users" className="nav-link">Users</Link>}
        </div>
        <div className="nav-right">
          {!token ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
