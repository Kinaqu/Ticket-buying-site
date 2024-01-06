import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from './AuthContextUser';

function Navbar() {
  const { logout, isAuthenticatedAsUser } = useAuthUser();

  const [isUser, setIsUser] = useState(isAuthenticatedAsUser());

  useEffect(() => {
    setIsUser(isAuthenticatedAsUser());
  }, [isAuthenticatedAsUser]);

  const linkStyle = {
    color: "red",
    marginRight: "20px",
    textDecoration: "none",
    fontSize: "16px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: '20px',
  };
  
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
  };
  
  return (
    <div>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          {isUser ? (
            <>
              <li>
                <Link to="/airtickets" style={linkStyle}>Air Tickets</Link>
              </li>
              <li>
                <Link to="/buslines" style={linkStyle}>Buslines</Link>
              </li>
              <li>
                <Link to="/traintickets" style={linkStyle}>Train Tickets</Link>
              </li>
              <li>
                <Link to="/profile" style={linkStyle}>Profile</Link>
              </li>
              <li>
                <Link to="/" style={linkStyle}>Home</Link>
              </li>
              <li>
              <button onClick={logout} style={linkStyle}>
                <Link to="/">Logout</Link>
              </button>
            </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" style={linkStyle}>Sign Up</Link>
              </li>
              <li>
                <Link to="/login" style={linkStyle}>Login</Link>
              </li>
              <li>
                <Link to="/" style={linkStyle}>Home</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}  

export default Navbar;