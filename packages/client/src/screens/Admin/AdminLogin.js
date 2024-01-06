import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { useAuthAdmin } from '../../components/AuthContextAdmin';
import styles from './AuthPage.module.css'; // Импортируйте стили

const AdminLoginPage = () => {
  const [adminLogin, setAdminLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuthAdmin();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/admin/login', {
        adminLogin: adminLogin,
        adminPassword: password,
      });
      console.log(response.data);
      authLogin('admin');
    } catch (error) {
      console.error('Ошибка входа', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <AdminNavbar />
      <div className={styles.authContent}>
        <h2>Admin Login</h2>
          <div className={styles.formGroup}>
            <label>Login:</label>
            <input type="text" value={adminLogin} onChange={(e) => setAdminLogin(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={styles.authButton} onClick={handleLogin}>
            Login
          </button>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;
