import React, { useState } from 'react';
import api from '../../api';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { useAuthAdmin } from '../../components/AuthContextAdmin';
import styles from './AuthPage.module.css';

const AdminLoginPage = () => {
  const [adminLogin, setAdminLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuthAdmin();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/admin/login', {
        adminLogin,
        adminPassword: password,
      });
      authLogin('admin');
    } catch (err) {
      setError('Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <AdminNavbar />
      <div className={styles.authContent}>
        {/* Logo */}
        <div className={styles.authLogo}>
          <div className={styles.authLogoIcon} style={{ background: '#dc2626' }}>🔐</div>
          <span className={styles.authLogoText}>FlyCo Admin</span>
        </div>

        <h1 className={styles.authTitle}>Admin Portal</h1>
        <p className={styles.authSubtitle}>Restricted access — authorised personnel only.</p>

        {/* Warning badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: 'rgba(234,179,8,0.08)',
          border: '1px solid rgba(234,179,8,0.2)',
          borderRadius: 10,
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 500 }}>
            Admin access only. Unauthorised access is prohibited.
          </span>
        </div>

        <div className={styles.formGroup}>
          <label>Admin Login</label>
          <input
            type="text"
            value={adminLogin}
            onChange={(e) => setAdminLogin(e.target.value)}
            placeholder="admin123"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
          />
        </div>

        <button
          className={styles.authButton}
          onClick={handleLogin}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1, background: '#dc2626' }}
        >
          {loading ? 'Authenticating…' : 'Access Dashboard →'}
        </button>

        {error && <p className={styles.authMessage}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;