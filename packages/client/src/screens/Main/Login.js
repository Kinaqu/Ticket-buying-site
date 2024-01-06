import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuthUser } from '../../components/AuthContextUser';




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, user } = useAuthUser(); // Получение функции login из контекста

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email: email,
        password: password,
      });
  
      const userData = response.data.user;
  
      // Проверьте, что userData содержит правильное поле для ID пользователя
      console.log('User data after login:', userData, user);
  
      // Устанавливаем информацию о пользователе
      login(userData);
  
      setMessage('Login successful');
    } catch (error) {
      console.error('Ошибка входа', error.response ? error.response.data : error.message);
      setMessage('Ошибка входа. Проверьте ваши учетные данные и повторите попытку.');
    }
  };

  return (
    <div className='login.css'>
  <Navbar />
  <div className="login-form">
    <h1>User Login</h1>
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button onClick={handleLogin}>Login</button>
    {message && <p>{message}</p>}
  </div>
  <Footer />
</div>

  );
};

export default LoginPage;