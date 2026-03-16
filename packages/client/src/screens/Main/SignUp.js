import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './AuthPage.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/signup', form);
      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setMessage('Registration failed. Please check your input and try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
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

        <h1 className={styles.authTitle}>Create account</h1>
        <p className={styles.authSubtitle}>Join thousands of travellers today.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={set('firstName')}
              placeholder="John"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={set('lastName')}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={set('password')}
            placeholder="••••••••"
          />
        </div>

        <button
          className={styles.authButton}
          onClick={handleRegister}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>

        {message && (
          <p className={styles.authMessage} style={success ? {
            background: 'rgba(52, 211, 153, 0.1)',
            borderColor: 'rgba(52, 211, 153, 0.3)',
            color: '#6ee7b7',
          } : {}}>
            {message}
          </p>
        )}

        <div className={styles.authFooter}>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;