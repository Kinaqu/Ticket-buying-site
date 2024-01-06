import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthAdmin } from './AuthContextAdmin';

function AdminNavbar() {
  const {  logout, isAuthenticatedAsAdmin } = useAuthAdmin();

  const [isAdmin, setIsAdmin] = useState(isAuthenticatedAsAdmin());

  useEffect(() => {
    setIsAdmin(isAuthenticatedAsAdmin());
  }, [isAuthenticatedAsAdmin]);

  const navStyle = {
    backgroundColor: "red", // Зеленый цвет фона
    padding: "10px", // Отступы
    borderRadius: "20px", // Скругление углов
  };

  const linkStyle = {
    color: "white", // Белый цвет текста
    marginRight: "20px", // Отступы между ссылками
    textDecoration: "none", // Убираем подчеркивание
  };

  return (
    <div>
      <nav style={navStyle}>
        <ul>
          <li>
            <Link to="/admin" style={linkStyle}>Home</Link>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/admin/edit_trains" style={linkStyle}>Edit Trains</Link>
                </li>
                <li>
                  <Link to="/admin/edit_traintickets" style={linkStyle}>Edit TrainTickets</Link>
                </li>
                <li>
                  <Link to="/admin/edit_planes" style={linkStyle}>Edit Planes</Link>
                </li>
                <li>
                  <Link to="/admin/edit_airtickets" style={linkStyle}>Edit Airtickets</Link>
                </li>
                <li>
                  <button onClick={logout} style={linkStyle}><Link to="/admin" >Logout</Link></button>
                </li>
              </>
            ) : (
              <Link to="/admin/login" style={linkStyle}>Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavbar;