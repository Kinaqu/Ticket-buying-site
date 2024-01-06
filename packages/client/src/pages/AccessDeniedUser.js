import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AccessDeniedUserPage() {
    return (
      <div>
          <Navbar />
        <h1>Ошибка</h1>
        <p>Вы не имеете доступа к странице. Пожалуйста, войдите в аккаунт.</p>
        <Footer />
      </div>
    );
  }


export default AccessDeniedUserPage;
