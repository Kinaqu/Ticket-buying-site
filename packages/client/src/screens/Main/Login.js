import React, { useState } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuthUser } from '../../components/AuthContextUser';
import styles from './AuthPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/api/login', { email, password });
      login(response.data.user);
      navigate('/');
    } catch (error) {
      setMessage('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className={styles.authContainer}>
      <Navbar />
      <div className={styles.authContent}>
        {/* Logo */}
        <div className={styles.authLogo}>
          <div className={styles.authLogoIcon}>✈</div>
          <span className={styles.authLogoText}>FlyCo</span>
        </div>

        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authSubtitle}>Sign in to manage your bookings.</p>

        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
          />
        </div>

        <button
          className={styles.authButton}
          onClick={handleLogin}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Signing in…' : 'Sign In →'}
        </button>

        {message && <p className={styles.authMessage}>{message}</p>}

        <div className={styles.authFooter}>
          Don't have an account?{' '}
          <Link to="/signup">Sign up for free</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;