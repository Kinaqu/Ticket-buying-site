import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './AuthPage.module.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        firstName: firstName, // Исправлено: используйте camelCase для соответствия принятому стилю
        lastName: lastName,
        email: email,
        password: password,
      });

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error in user registration', error.response ? error.response.data : error.message);
      setMessage('Error in user registration. Please check your input and try again.'); // Исправлено: более информативное сообщение об ошибке
    }
  };

  return (
    <div className={styles.authContainer}>
      <Navbar />
      <div className={styles.authContent}>
        <h1>User Registration</h1>
          <div className={styles.formGroup}>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={styles.authButton} onClick={handleRegister} type="submit">Register</button>
        {message && <p className={styles.authMessage}>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
