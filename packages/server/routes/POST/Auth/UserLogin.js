const express = require('express');
const router = express.Router();
const passport = require('./config');
const User = require('../../../db/models/User'); 

// Маршрут для входа пользователя
router.post('/login', (req, res, next) => {
  // Используем Passport для аутентификации пользователя
  passport.authenticate('user', (err, user) => {
    if (err || !user) {
      // Обработка ошибок аутентификации
      console.error('Authentication failed:', err);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Вход пользователя
    req.logIn(user, async (err) => {
      if (err) {
        // Обработка ошибок при входе
        console.error('Login failed:', err);
        return res.status(401).json({ message: 'Login failed' });
      }

      // Формирование данных о пользователе для отправки на фронтенд
      const userData = {
        id: user._id,
        // Другие данные о пользователе, которые вы хотите отправить на фронтенд
      };

      // Отправка успешного ответа с данными пользователя на клиент
      res.json({ message: 'User logged in successfully', user: userData });
    });
  })(req, res, next); // Вызываем аутентификацию с передачей объектов запроса, ответа и следующей функции middleware
});

// Маршрут для выхода пользователя
router.get('/logout', (req, res) => {
  req.logout(); // Выход пользователя
  res.json({ message: 'User logged out successfully' }); // Отправка успешного ответа о выходе на клиент
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;