const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const insertAdminData = async () => {
  try {
    // Проверка наличия данных в коллекции Admins
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log("Данные админов уже существуют.");
      return;
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Данные для заполнения коллекции Admins
    const adminData = [
      {
        AdminLogin: 'admin123',
        AdminPassword: hashedPassword,
        AdminName: 'Admin',
      },
    ];

    // Вставка данных в коллекцию Admins
    await Admin.insertMany(adminData);
    console.log("Данные админов добавлены в коллекцию Admins.");
  } catch (error) {
    console.error("Ошибка при добавлении данных админов:", error);
  }
};

module.exports = insertAdminData;