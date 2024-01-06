// Подключение необходимых модулей и зависимостей
const Userpassport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../db/models/User');
const bcrypt = require('bcrypt'); // Подключение модуля для хеширования паролей

// Настройка стратегии локальной аутентификации для пользователя
Userpassport.use('user', new LocalStrategy({
  usernameField: 'email', // Наименование поля с электронной почтой в запросе
  passwordField: 'password', // Наименование поля с паролем в запросе
}, async (email, password, done) => {
  try {
    // Поиск пользователя в базе данных по электронной почте
    const user = await User.findOne({ Email: email });

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    // Сравнение хеша пароля пользователя
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!passwordMatch) {
      // Если пароль не соответствует, возвращаем ошибку
      return done(null, false, { message: 'Incorrect email or password' });
    }

    // Успешная аутентификация, передаем пользователя
    return done(null, user);
  } catch (error) {
    // Обработка ошибок при аутентификации
    return done(error);
  }
}));

// Настройка сериализации пользователя при сохранении в сеансе
Userpassport.serializeUser((user, done) => {
  console.log('Serialize user:', user);
  done(null, user.id); // Сериализация пользователя по ID
});

// Настройка десериализации пользователя при запросе
Userpassport.deserializeUser(async (id, done) => {
  console.log('Deserialize user ID:', id);
  try {
    // Поиск пользователя в базе данных по ID для восстановления
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    done(null, user); // Восстановление пользователя
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error); // Обработка ошибок при десериализации
  }
});

// Экспорт настроенного объекта Passport для использования в других частях приложения
module.exports = Userpassport;