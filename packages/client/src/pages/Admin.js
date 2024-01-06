import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

const AdminPage = () => {
  const containerStyle = {
    backgroundColor: 'white', // Зеленый цвет фона
    color: 'red', // Белый цвет текста
    textAlign: 'center', // Выравнивание текста по центру
    padding: '20px', // Отступы
  };

  const linkStyle = {
    color: '#ffffff', // Белый цвет текста
    textDecoration: 'none', // Отключаем подчеркивание ссылок
    padding: '10px 20px', // Отступы
    backgroundColor: 'red', // Зеленый цвет фона для кнопки
    borderRadius: '20px', // Закругление углов кнопки
    margin: '10px', // Внешний отступ
    display: 'inline-block', // Элемент блочного уровня
  };

  return (
    <div style={containerStyle}>
      <AdminNavbar />
      <h2>Welcome to the Admin Page</h2>
      <Link to="/admin/login" style={linkStyle}>
        Go to Admin Login
      </Link>
      <div><Footer /></div>
    </div>
  );
};

export default AdminPage;
