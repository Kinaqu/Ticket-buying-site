// Подключение необходимых модулей
const express = require('express');
const router = express.Router();
const passport = require('./adminconfig'); // Подключение настроек Passport.js

// Обработка POST-запроса по пути '/login'
router.post('/login', (req, res, next) => {
  // Аутентификация пользователя с использованием стратегии 'admin' Passport.js
  passport.authenticate('admin', (err, admin, info) => {
    if (err) { return next(err); } // Обработка ошибок аутентификации

    if (!admin) {
      // Если аутентификация не удалась (например, неправильные учетные данные), возвращаем ошибку 401
      return res.status(401).json({ message: 'Admin login failed' });
    }

    // Если аутентификация успешна, выполняем вход пользователя
    req.logIn(admin, (err) => {
      if (err) { return next(err); } // Обработка ошибок при входе

      // Возвращаем успешный ответ после успешного входа
      return res.json({ message: 'Admin logged in successfully' });
    });
  })(req, res, next); // Вызываем аутентификацию с передачей объектов запроса, ответа и следующей функции middleware
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;