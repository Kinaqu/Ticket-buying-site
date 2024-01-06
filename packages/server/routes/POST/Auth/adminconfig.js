// Подключение необходимых модулей и зависимостей
const Adminpassport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../../../db/models/Admin'); // Подключение модели администратора из базы данных
const bcrypt = require('bcrypt'); // Подключение модуля для хеширования паролей

// Настройка сериализации пользователя при сохранении в сеансе
Adminpassport.serializeUser((admin, done) => {
  done(null, admin.id); // Сериализация администратора по ID
});

// Настройка десериализации пользователя при запросе
Adminpassport.deserializeUser(async (id, done) => {
  try {
    const admin = await Admin.findById(id); // Поиск администратора по ID в базе данных
    done(null, admin); // Восстановление администратора
  } catch (error) {
    done(error); // Обработка ошибок при десериализации
  }
});

// Настройка стратегии локальной аутентификации для админа
Adminpassport.use('admin', new LocalStrategy({
  usernameField: 'adminLogin', // Наименование поля с логином в запросе
  passwordField: 'adminPassword', // Наименование поля с паролем в запросе
}, async (adminLogin, adminPassword, done) => {
  try {
    // Поиск администратора в базе данных по логину
    const admin = await Admin.findOne({ AdminLogin: adminLogin });

    // Если администратор не найден, возвращаем ошибку
    if (!admin) {
      return done(null, false, { message: 'Incorrect admin login or password' });
    }

    // Сравнение хеша пароля администратора
    const passwordMatch = await bcrypt.compare(adminPassword, admin.AdminPassword);
    if (!passwordMatch) {
      // Если пароль не соответствует, возвращаем ошибку
      return done(null, false, { message: 'Incorrect admin login or password' });
    }

    // Успешная аутентификация, передаем администратора
    return done(null, admin);
  } catch (error) {
    // Обработка ошибок при аутентификации
    return done(error);
  }
}));

// Экспорт настроенного объекта Passport для использования в других частях приложения
module.exports = Adminpassport;