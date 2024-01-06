import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';


function AccessDeniedAdminPage() {
    return (
      <div>
        <AdminNavbar />
        <h1>Ошибка</h1>
        <p>Вы не имеете доступа к странице. Пожалуйста, войдите в аккаунт.</p>
        <div><Footer /></div>
      </div>
    );
  }
  export default AccessDeniedAdminPage;
