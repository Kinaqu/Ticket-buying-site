const express = require('express');
const router = express.Router();
const User = require('../../../db/models/User');
const bcrypt = require('bcrypt');

// Маршрут для регистрации нового пользователя
router.post('/signup', async (req, res) => {
  try {
    // Извлечение данных о пользователе из запроса
    const { firstName, lastName, email, password } = req.body;

    // Хеширование пароля с использованием bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создание нового пользователя с хешированным паролем
    const newUser = new User({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PasswordHash: hashedPassword,
    });

    // Сохранение нового пользователя в базе данных
    await newUser.save();

    // Отправка успешного ответа при успешной регистрации
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Обработка ошибок в случае возникновения проблем при регистрации
    console.error('Error in user registration', error);
    res.status(500).json({ message: 'Error in user registration. Please try again.' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;